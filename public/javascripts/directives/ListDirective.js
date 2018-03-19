
    app
        .directive('list', function counter() {
            return {
                restrict:"E",
                scope: {
                    items:"=",
                    fields:"=",
                    getActions:"=",
                    listStatus:"="
                },

                link: function (scope, element, attrs) {


                },
                controller: function ($scope) {
                    if(!$scope.listStatus)
                    {
                        $scope.listStatus='loading';
                    }
                },

                templateUrl:"/views/list-template.html"
            };
        });