1. install meteor and node 
https://www.meteor.com/install

$curl https://install.meteor.com/ | sh

2. meteor scaffolding 
folder structure

client/ 
server/ 
model/

3. order of execution
 
lib
sub folders
alphabet
main.*


4. To get started fast:

  $ meteor create ~/my_cool_app
  $ cd ~/my_cool_app
  $ meteor

5. visibility and scope
public/
private/
client/compatibility/
[.anything]


package install 

meteor list
meteor add twbs:bootstrap
meteor add accounts-ui
meteor add accounts-password
meteor add ian:accounts-ui-bootstrap-3
meteor remove accounts-ui


meteor add voodoohop:masonrify



using input elements
handling event 

Snippet : Main board 

template: <template name=snippet>
html:    {{> snippet}}
JS: Template.snippet.helper({
        snippet: function(){
            return snippet.find().fetch()
        }
})

Toolbar: data insert 

template: template name=toolbar
html:     {{>toolbar}}
JS:       Template.toolbar.event({

            'click #btnAdd': function(e){
                var textInput = $('#txtAdd)
                if(!textInput || !textInput.val()) return;
                Snippet.insert({text:textInput.val()});
                textInput.val("");
            }


})





securing application 

data transactions 
add multiple users 

$meteor remove insecure

-> access denied 

tell meteor what is allowed on server  


1.interacting with external library 

2.server-only service 
3.connection service with ddp 

4.event handling and data changes 



------- creating clean web and REST service ---------

1. Iron router (well documneted )
    install
    what user are looking for, control page, state of the app
    $meteor add iron:router
    $ meteor remove autopublish


2. Iron router template 
 applying template 
    snippet.html
    template name="main"
    
    client.js
    Route.configure(
        layoutTemplate:"main"
    )
   global 
    REST.js
    Route.route() : Header metadata


 
3. createing REST endpoint
    
    support post 
    edit via PUT 
    removing with DELETE
    
    postman chrome extension
    $ meteor npm install --save bcrypt

----- responsive ui ---------



