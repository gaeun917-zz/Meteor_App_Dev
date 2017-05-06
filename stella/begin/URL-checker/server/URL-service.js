// 1. connect to server
var conn = DDP.connect('localhost:3000');
// 2. creating mongodb collection
Snippets = new Mongo.Collection('snippets', conn);

// 3. create token collection
Tokens = new Mongo.Collection('user-tokens');
var token = Tokens.findOne({});

// 3. toekn is not there, then goto init login, otherwise, login with toekn
if (!token) {
    initLogin();
} else {
    loginWithToken(token);
}

// 4. if we have a valid token
if (token) {
    conn.subscribe('snippets-user1', function () {
        Snippets.find({}).observeChanges({
            added: function (id, s) {
                if (!s.text || s.URL) return;
                if (s.text.indexOf('http') === 0) {
                    s.URL = s.text;
                    try {
                        Snippets.update({_id: id}, {$set: s});
                    } catch (e) {
                        console.log("error updating ", id);
                        console.log(e);
                    }
                }
            }
        });
    });
}


// 5. login
function initLogin() {
    //user1 is admin
    conn.call('login', {user: {email: 'user1@abc.com'}, password: 'test123'},
        function (err, result) {
            if (err) {
                console.log("error login");
                console.log(err);
                return;
            }
            Tokens.upsert({userid: result.id}, {$set: result});
        });
}

//6. token login
function loginWithToken(token) {
    conn.call('login', {resume: token.token},
        function (err, result) {
            if (err) {
                Tokens.remove({});
                console.log("error with Token");
                console.log(err);
                initLogin(); // if the toekn did not work, try logging in init
                return;
            }
            Tokens.upsert({userid: result.id}, {$set: result});
        });
}