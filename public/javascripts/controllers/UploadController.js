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



        asyncForEach(angular.copy(files),function (err) {

            if(!err)
            {
                $location.path('/gallery/'+$scope.currentGallery._id+"/files");
                $scope.$apply();
            }


        },function (file,index,next) {

            if(!file._id)
            {
                axios.post('/api/file/',file,{headers:$rootScope.headers})
                    .then(function (response) {
                        //TODO: fire toast on successfully uploaded file
                        files.splice(index,1);
                        $scope.$apply();


                        next();
                    })
                    .catch(function (error) {

                        console.log(error);

                        if(error.response && error.response.data && error.response.data.type && error.response.data.type == 'ValidationError')
                        {

                            console.log(error.response.data.details);
                            $scope.validationErrors = error.response.data.details;


                            $scope.$apply();

                        }
                        else
                        {
                            $rootScope.errorHandler(error);
                        }


                    });
            }


        })

    }




});