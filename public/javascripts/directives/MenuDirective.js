
app
    .directive('menu', function counter() {
        return {
            restrict:"E",
            scope: {
                source:"="
            } ,
            controller: function ($scope,$rootScope,$location,$cookies,$routeParams) {
                $scope.logout=function () {

                    $cookies.remove('access_token');
                    window.location.href="/login"

                }

                $scope.setActive=function(){

                    var filter = $scope.menuItems.filter(function (t) {
                        t.active = false;
                        t = angular.copy(t);
                        t = t.href.replace("#!","");
                        return (t==$location.path());
                    });
                    if(filter && filter.length)
                    {

                        filter[0].active=true;

                    }
                };
                $scope.$on('$locationChangeSuccess', $scope.setActive);

                $scope.menuItems = [];

                if(typeof $scope.source == "object")
                {
                    $scope.menuItems = $scope.source;
                }
                else
                {
                    axios.get($scope.source,{headers:$rootScope.headers})
                        .then(function (response) {
                            $scope.menuItems = response.data;
                            $scope.setActive();
                            $scope.$apply();


                        })
                        .catch($rootScope.errorHandler);

                }



            },

            templateUrl:"/views/directives/menu-template.html"
        };
    });