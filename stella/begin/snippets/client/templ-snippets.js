// for our general use
// (we will use specific files as needed, for clarity!)

// helper is like a controller data processing
Template.snippets.helpers({

   snippets : function () {
       //data brings to the client
       return Snippets.find().fetch();
   },
    isLink: function () {
        return(this.URL != undefined);
    }

});