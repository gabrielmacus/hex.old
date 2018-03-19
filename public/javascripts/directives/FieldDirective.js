
app
    .directive('field', function counter() {
        return {
            restrict:"E",
            scope: {
                type:"@",
                label:"@",
                model:"="
            },
            link: function (scope, element, attrs) {


            },
            controller: function ($scope) {
              if(!$scope.type)
              {
                  $scope.type="text";
              }
            },

            templateUrl:"/views/field-template.html"
        };
    });