
console.log("Starting...");

var args = require('system').args;

var fs = require('fs');

var page = require('webpage').create();

var status=false;



function logIn() {

page.evaluate(function(args){
        document.querySelector("input[name='email']").value = args[2];
        document.querySelector("input[name='pass']").value = args[3];
        document.querySelector("#login_form").submit();
        console.log("Logged in ");
    },args);
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


    for(var i=1;i<=3;i++)
    {
        var arg = 6+i;
        if(args[arg])
        {
            page.uploadFile('input[name="file'+i+'"]', args[arg]);
        }


    }


    page.evaluate(function (args) {
        document.querySelector("[name='composer_attachment_sell_title']").value=args[4];
        document.querySelector("[name='composer_attachment_sell_price']").value=args[5];
        document.querySelector("[name='xc_message']").value=args[6];
        document.querySelector("[type='submit']").click();

    },args);



    //page.render('C:\\Users\\Gabriel\\output.png');

    //

/*    page.includeJs("https://code.jquery.com/jquery-3.3.1.min.js", function() {

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



    });*/

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


    page.open("https://m.facebook.com/groups/"+id);

}
function onConsoleMessage(msg) {
    console.log(msg);
};
function sellSomething() {
    page.evaluate(
        function () {
            document.querySelector("[href*='/groups/sell/']").click()
        }
    );
}
function goHome() {

   var goHome= page.evaluate(function () {

        if( document.querySelector("[target]"))
        {
            document.querySelector("[target]").click();
            return false;
        }
        else
        {
            return true;
        }
    });

   if(goHome)
   {
       page.open("https://www.facebook.com/home.php");
   }


}
page.onConsoleMessage = onConsoleMessage;

page.onCallback = function(data) {

    switch (data.type)
    {
        case "goto":

            page.open(data.url);

            break;
    }

    //page.render('C:\\Users\\Gabriel\\output.png');

};
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko';
page.onLoadFinished=function (response) {

    if(response=='success')
    {
        console.log("Status: "+status);


        if(!status || typeof  status == "undefined" || status == "false")
        {

            logIn();
            status="onetouch-login";
        }
        else if(status =="onetouch-login")
        {

            status="logged-in";
            goHome();


        }
        else if(status == "logged-in")
        {
            status="in-group";
            goToGroup(args[1]);

        }
        else if(status == "in-group")
        {
            sellSomething();
            status='selling-something';

        }
        else if(status=='selling-something')
        {
            postInGroup();
            status="end";
        }
        else if(status=='end')
        {
            console.log("Succesfully posted on group")
            phantom.exit();
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
page.open("https://m.facebook.com");
