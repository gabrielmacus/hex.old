app.controller('main-controller', function ($sce,$scope,$rootScope,$cookies,$location) {

    $rootScope.headers = {'Authorization':'JWT '+$cookies.get("access_token")};
    $rootScope.errorHandler=function (e) {
        alert("Error");
        console.log(e);
    }



    var defaultActions=
        [
            {
                "text":"edit", "action": function (i) {
                $location.path('/'+$routeParams.model+'/save/'+i._id)
            }
            },
            {
                "text":"delete", "action":
                function (i) {

                    $rootScope.confirmDialog=
                        {
                            yes:function () {

                                $rootScope.deleteElement(i._id);
                                $rootScope.confirmDialog.open=false;

                            },
                            title:"confirm.delete",
                            open:true
                        };


                }
            }
        ];
    $rootScope.defaultActions = function (i) {

        return defaultActions;

    };

    var galleryActions =defaultActions.concat(
            [{"text":"viewFiles","action":function (g) {

            $location.path('/gallery/'+g._id+'/files/');

            }},
            {"text":"uploadFiles","action":function (g) {

            $location.path("/gallery/"+g._id+"/upload");

            }}

         ]);


    $rootScope.config={
        product:{fields:["_id","title"]},
        user:{fields:['name']},
        "facebook-post":{fields:['title','description','price','type']},
        gallery:{
            fields:['name'],
            actions:function () {

                return  galleryActions;
            }

        },
        file:
            {
                fields:[
                    {label:'image',field:'path',render:function (item) {

                        return "<img src='"+item.path+"' >";

                    }},
                    'filename'
                ]
            }

    };
});