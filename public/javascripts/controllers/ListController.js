app.controller('list-controller', function ($scope,$rootScope,$routeParams,$location) {

    var url ="/api/".concat($routeParams.model);

    $scope.model=$routeParams.model;
    $scope.query = {page:1};
    $scope.items = [];

    $scope.actions = ($rootScope.config[$routeParams.model].actions)?$rootScope.config[$routeParams.model].actions:$rootScope.defaultActions;


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

                if(response.data.docs.length == 0 && $scope.pagination.page > 1)
                {
                    $scope.goTo($scope.pagination.page - 1);
                }
                else
                {
                    $scope.items = response.data.docs;
                    $scope.pagination = response.data.pagination;
                    $scope.status='loaded';
                    $scope.$apply();
                }


            })
            .catch($rootScope.errorHandler);

    }

    $rootScope.deleteElement=function (id) {

        axios.delete('/api/'+$routeParams.model+'/'+id,{headers:$rootScope.headers})
            .then(function (response) {

                $scope.loadList();

            })
            .catch($rootScope.errorHandler);

    }

    $scope.loadList();

});