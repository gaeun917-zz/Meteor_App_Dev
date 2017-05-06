// for our general use
// (we will use specific files as needed, for clarity!)

//snippets is the main html

Meteor.subscribe('snippets');
// snippet.html <template name='main'>
// make rest.js on server folder
Router.configure({
    layoutTemplate : 'main'
});