app.controller('main-controller', function ($sce,$scope,$rootScope,$routeParams,$cookies,$location,$compile) {


    $rootScope.headers = {'Authorization':'JWT '+$cookies.get("access_token")};
    $rootScope.errorHandler=function (error) {
        alert("Error");

        console.log(error.response);



    }



    var defaultActions=
        [
            {
                "text":"edit", "action": function (i) {

                $location.path('/'+$routeParams.model+'/'+i._id+'/save')
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
            },
            {
                "class":{"show-on-popup":true,"select":true},"text":"select","action":function (i) {

                i.selected = true;
            }
            },
            {
                "class":{"show-on-popup":true,"unselect":true},"text":"unselect","action":function (i) {
                i.selected = false;
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
        product:{fields:["title"]},
        user:{fields:['name']},
        "facebook-post":{fields:['title','description','price',{label:'type',field:'type',render:function (item) {

                return $scope.$eval("'facebook.post.type."+item.type+"' | translate ");
        }}]},
        gallery:{

            fields:['name'],
            actions:function () {

                return  galleryActions;
            }

        },
        file:
            {
                fields:[
                    {label:'preview',field:'path',file:true},
                    'filename',
                    'description'
                ]
            },
        person:
            {
                fields:['name','surname']
            }

    };
});