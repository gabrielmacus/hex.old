app.controller('list-controller', function ($scope,$rootScope,$routeParams,$location) {

    var url ="/api/".concat($routeParams.model);

    $scope.model=$routeParams.model;
    $scope.query = {page:1};
    $scope.items = [];

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

                                $scope.deleteElement(i._id);
                                $rootScope.confirmDialog.open=false;

                            },
                            title:"confirm.delete",
                            open:true
                        };
                    /*
                    var r = confirm("Eliminar");
                    if (r == true) {
                        $scope.deleteElement(i._id);
                    } else {

                    }*/


                }
            }
        ];
    $rootScope.defaultActions = function (i) {

        return defaultActions;

    };


    $scope.actions = ($scope.config[$routeParams.model].actions)?$scope.config[$routeParams.model].actions:$rootScope.defaultActions;


    $scope.pagination = {};
    $scope.fields = $scope.config[$routeParams.model].fields;


    $scope.status='loading';

    $scope.goTo=function(pag)
    {
        $scope.query.page = pag;
        $scope.loadList();
    }

    $scope.loadList=function () {

        $scope.status='loading';

        axios({url:url,params:$scope.query,method:"get",headers:$scope.headers})

            .then(function (response) {

                $scope.items = response.data.docs;
                $scope.pagination = response.data.pagination;
                $scope.status='loaded';
                $scope.$apply();

            })
            .catch($rootScope.errorHandler);

    }

    $scope.deleteElement=function (id) {

        axios.delete('/api/'+$routeParams.model+'/'+id,{headers:$rootScope.headers})
            .then(function (response) {

                console.log(response.data);
                $scope.loadList();

            })
            .catch($rootScope.errorHandler);

    }

    $scope.loadList();

});