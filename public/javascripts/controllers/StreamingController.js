app.controller('streaming-controller', function ($sce,$scope,$rootScope,$routeParams,$cookies,$location,$compile,$interval,$http) {

    var loading =false;
    $interval(function () {

        if(!loading)
        {


            axios({url:$scope.url,params:$scope.query,method:"get",headers:$scope.headers})

            .then(function (response) {

                $scope.items =[];
                $scope.$apply();
                $scope.items = response.data.docs;
                $scope.pagination = response.data.pagination;
                loading = false;
                $scope.$apply();


            })
            .catch($rootScope.errorHandler);

        }


    },5000);


});