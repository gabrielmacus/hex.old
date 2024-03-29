app.controller('main-controller', function ($sce,$scope,$rootScope,$routeParams,$cookies,$location,$compile) {

    $rootScope.currentUser = user;
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

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
                            class:{"hide-close":true},
                            title:"confirm.delete",
                            titleData:{name:(i.title || i.name || i.filename || i._id)},
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
    var streamingActions = [{text:'streaming.watch',action:function (i) {

            $location.path('/streaming/'+i._id+'/watch');

        }}];

    $rootScope.config={
        product:{fields:["title",{label:'image',field:'images',render:function(item){

            return "<img src='"+item.images[0].image.path+"'>";
        }}]},
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
            },
        assignment:
            {

             fields:['title',{field:'date',render:function (i) {
                 return new Date(i.date).toLocaleDateString()
             }},{field:'persons',label:'person/s',render:function (i) {

                 var persons = i.persons.map(function (t) { return t.name+" "+t.surname });

                 return persons.join(", ");

             }},{field:'type',label:'type',render:function (i) {

                 return i.type.name;

             }}
             ,
                 {label:'assignmentPlace',field:'place',render:function (i) {

                     return i.place;

                 }}
             ]
            },
        "assignment-type":
            {
                fields:['name']
            },
            streaming:
                {
                 listController:'dynamic-list-controller',
                 fields:['path','views'], actions:function () {return streamingActions;}
            }

    };
});