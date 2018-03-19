app.controller('save-controller', function ($scope,$rootScope,$routeParams,$location) {

    $scope.item = {};

    var url ="/api/".concat($routeParams.model);

    if($routeParams.id)
    {
        url+="/"+$routeParams.id;

        $scope.loadItem();
    }

    $scope.loadItem=function () {

        axios.get(url,{headers:$rootScope.headers})
            .then(function (response) {
                console.log(response);
            })
            .catch($rootScope.errorHandler);

    }


    $scope.saveItem=function () {

        console.log($scope.item)

        axios({
            url:url,
            method:($routeParams.id)?"PUT":"POST",
            headers:$rootScope.headers,
            data:$scope.item
        })
            .then(function (response) {

                console.log(response.data);

            })
            .catch($rootScope.errorHandler);

    }



});