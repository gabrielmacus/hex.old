app.controller('upload-controller', function ($scope,$rootScope,$routeParams,$location) {

    $scope.gallery = $routeParams.id;

    $scope.files=[];

    $scope.loadCurrentGallery=function () {
        axios.get('/api/gallery/'+$scope.gallery,{headers:$rootScope.headers})
            .then(function (response) {
                $scope.currentGallery = response.data;
                $scope.$apply();
            })
            .catch($rootScope.errorHandler);

    }
    $scope.loadCurrentGallery();
    $scope.saveFiles= function (files) {


        asyncForEach(angular.copy(files),function () {

        },function (file,index,next) {

            if(!file._id)
            {
                console.log(file);
                axios.post('/api/file/',file,{headers:$rootScope.headers})
                    .then(function (response) {
                        console.log(response);
                        next();
                    })
                    .catch($rootScope.errorHandler);
            }


        })

    }




});