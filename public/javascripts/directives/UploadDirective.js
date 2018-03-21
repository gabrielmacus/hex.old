
app
    .directive('uploadField', function counter() {
        return {
            restrict:"E",
            scope: {
                label:"=",
                uploadUrl:"@",
                saveUrl:"@",
                gallery:"=",
                //galeriesUrl:"@",
                model:"="
            } ,
            link: function (scope, element, attrs) {

                var fileUploadElement = element[0].querySelector("[type='file']");



                var data = new FormData();
                fileUploadElement.addEventListener('change',function (e) {
                    var files = fileUploadElement.files;

                    for(var i =0 ;i<files.length;i++)
                    {
                        data.append(files[i].name,files[i]);
                    }
                    scope.upload(data);

                });

            },
            controller:function ($scope,$rootScope) {

                $scope.model = [];

                /*
             $scope.galeries = [];

             $scope.loadGaleries=function () {
                 axios.get($scope.galeriesUrl,{headers:$rootScope.headers})
                     .then(function (response) {
                         console.log(response);
                         $scope.galeries = response.data.docs;
                         $scope.$apply();
                     })
                     .catch($rootScope.errorHandler);

             }
             $scope.loadGaleries();*/




                $scope.upload=function (data) {

                    axios.put($scope.uploadUrl, data, {headers:$rootScope.headers})
                        .then(function (res) {

                            res.data.forEach(function (file) {

                                file.gallery = $scope.gallery;
                                $scope.model.push(file);

                            })

                            $scope.$apply();

                        })
                        .catch($rootScope.errorHandler);
                }

                /*
                $scope.saveFiles=function () {

                    asyncForEach($scope.model,function () {



                    },function (item,index,next) {

                        axios.post($scope.saveUrl,item,{headers:$rootScope.headers})
                            .then(function (response) {

                                console.log(response);
                                next();

                            })
                            .catch($rootScope.errorHandler);
                    })



                }*/

            },

            templateUrl:"/views/directives/upload-template.html"
        };
    });