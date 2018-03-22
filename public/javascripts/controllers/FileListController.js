app.controller('file-list-controller', function ($scope,$rootScope,$controller,$routeParams,$location) {

    $routeParams.model="file";

    $controller('list-controller',{$scope:$scope,$routeParams:$routeParams});

    $scope.query.gallery = $routeParams.id;
    $scope.currentGallery ='...';
    $scope.loadCurrentGallery=function () {
        axios.get('/api/gallery/'+$scope.query.gallery,{headers:$rootScope.headers})
            .then(function (response) {
                $scope.currentGallery =response.data.name;
                $scope.$apply();
            })
            .catch($rootScope.errorHandler);
    }
    $scope.loadCurrentGallery();

});