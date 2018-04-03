app.controller('save-controller', function ($scope,$rootScope,$routeParams,$location,$controller) {


    $rootScope.bodyClass ={"save":true};
    $scope.item = {};
    var url ="/api/".concat($routeParams.model);
    $scope.model=$routeParams.model;

    $controller('api-controller',{$scope:$scope,$routeParams:$routeParams});


    $scope.loadItem=function () {

        console.log($routeParams);
        axios.get(url,{headers:$rootScope.headers})
            .then(function (response) {
                $scope.item = response.data;
                $scope.$apply();
            })
            .catch($rootScope.errorHandler);

    }


    if($routeParams.id)
    {
        $scope.id= $routeParams.id;
        url+="/"+$routeParams.id;


        $scope.loadItem();
    }



    $scope.saveItem=function () {

        $scope.validationErrors = {};
        axios({
            url:url,
            method:($routeParams.id)?"PUT":"POST",
            headers:$rootScope.headers,
            data:$scope.item
        })
            .then(function (response) {

                console.log(response.data);
                $location.path("/"+$scope.model);
                $scope.$apply();


            })
            .catch(function(error){


                if(error.response.data.type && error.response.data.type == 'ValidationError')
                {

                    $scope.validationErrors = error.response.data.details;


                    $scope.$apply();

                }
                else
                {
                    $rootScope.errorHandler(error);
                }



            });

    }



});