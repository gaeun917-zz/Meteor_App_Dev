// general server-side code
// (will get specific as needed)
Router.route('/api/', {where: 'server'})
    .get(function () {
        //write header
        writeHeaders(this);
        //send out response
        this.response.end('GET is not supported ');
    })
    .post(function () {
        writeHeaders(this);
        //1. check to see if an email address was sent
        var useremail = this.request.body.email;
        if (!useremail) {
            this.response.end('No user specified...\n');
            return;
        }
        // check to see if the user exists...
        var user = Meteor.users.findOne({
            emails: {
                $elemMatch: {
                    address: useremail
                }
            }
        });
        //2.1 if not,
        if (!user) {
            this.response.end('user not found ');
            return;
        }
        //3. send data
        var records = Snippets.find({owner: user._id}).fetch();
        this.response.end(JSON.stringify(records));
    })
    .put(function () {
        writeHeaders(this);
        var record = this.request.body.update;
        if (!record) {
            this.response.end('nothing requested');
            return;
        }
        var update = Snippets.upsert(
            {_id: record.id}, {$set: record.changes});
        console.log(update);
        this.response.end('snippet is updated')
    })
    .delete(function () {
    writeHeaders(this);
    var recId = this.request.body.snippetID;
    if (!recId) {
        this.response.end('no id submitted');
        return;
    }
    var del = Snippets.remove({_id: recId});
    console.log('snippet delected ');
    this.response.end('Snippet deleted!\n');
});


function writeHeaders(self) {
    self.response.statusCode = 200;
    self.response.setHeader("Content-Type", "application/json");
    self.response.setHeader("Access-Control-Allow-Origin", "*");
    self.response.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
}