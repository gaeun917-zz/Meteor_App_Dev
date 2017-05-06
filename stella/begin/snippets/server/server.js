// general server-side code
// (will get specific as needed)


// data is found by userid
Meteor.publish("snippets", function () {
    return Snippets.find({owner:this.userId});
});
//user1 is admin
Meteor.publish("snippets-user1", function () {
    return Snippets.find();
});
//only logged in user can use snippet
Snippets.allow({
    insert: function (userId, field) {
        return(userId);
    },
    update:function (userId, field) {
        return(userId); // user id is not null
    }
});