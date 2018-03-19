app.controller('main-controller', function ($scope,$rootScope,$cookies) {

    $rootScope.headers = {'Authorization':'JWT '+$cookies.get("access_token")};
    $rootScope.errorHandler=function (e) {
        alert("Error");
        console.log(e);
    }




    $rootScope.config={
        product:{fields:["_id","title"]},
        user:{fields:['name']},
        "facebook-post":{fields:['title','description','price','type']}

    };
});