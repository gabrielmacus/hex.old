console.log("Starting...");


var fs = require('fs');


var system = require('system');

var page = require('webpage').create();

var status=false;
var groupId="407850475895832";

function logIn() {

page.evaluate(function(){
        document.querySelector("input[name='email']").value = "gabrielmacus@hotmail.com";
        document.querySelector("input[name='pass']").value = "sercan02";
        document.querySelector("#login_form").submit();
        console.log("Logged in ");
    });
}

/*
function publishContent() {


    var email = system.args[1];
    var password = system.args[2];
    var title = system.args[3];
    var text = system.args[4];

    var args = JSON.stringify({title:title,text:text});

    page.evaluate(function(args){

        args = JSON.parse(args);

        document.querySelector('[aria-label^="Crear"] textarea').value=args.text;//"Actualizacion "+Math.random();
        document.querySelector("[aria-label^='Crear'] [type='submit']").click();
        console.log("Content published");
    },args);
 
}
*/
function postInGroup() {
    page.includeJs("https://code.jquery.com/jquery-3.3.1.min.js", function() {

        var pos = page.evaluate(function () {

            return $("[placeholder*='vendes?']").offset();
        });

        page.sendEvent('click', pos.left, pos.top, 'left');
        console.log("Pos is", JSON.stringify(pos));

        setTimeout(function () {
            page.evaluate(function (args) {
                window.callPhantom();
            });
        }, 3000)



    });

    /*
    setTimeout(function () {

                var element = page.evaluate(function() {
                    return document.querySelector("[placeholder='Precio']");
              });

                page.sendEvent('click', element, element.offsetTop, 'left');
                page.sendEvent('keypress', page.event.key.A, null, null, 0);
        page.evaluate(function(args) {
            window.callPhantom();
        });
    }, 1000)*/
  /*  var element = page.evaluate(function() {
        return document.querySelector("[placeholder*='vendes?']");
    });
    page.sendEvent('click', element.offsetLeft, element.offsetTop, 'left');
*/

}

function goToGroup(id) {

    page.open("https://www.facebook.com/groups/"+id);

}
function onConsoleMessage(msg) {
    console.log(msg);
};


page.onConsoleMessage = onConsoleMessage;

page.onCallback = function(result) {
    page.render('C:\\users\\Puers\\output.png');

};
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36';
page.onLoadFinished=function (response) {

    if(response=='success')
    {
        console.log(status);

        if(!status || typeof  status == "undefined" || status == "false")
        {
            logIn();
            status="logged-in";
        }
        else if(status == "logged-in")
        {
            goToGroup(groupId);
            status="in-group";
        }
        else if(status == "in-group")
        {


            postInGroup();
        }
        else
        {
            console.log("Unknown status:"+status);
            phantom.exit();
        }

    }
    else
    {
        console.log("Failed");
        phantom.exit();
    }

}
page.open("https://www.facebook.com");
