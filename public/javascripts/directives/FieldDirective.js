
app
    .directive('field', function counter() {
        return {
            restrict:"E",
            scope: {
                type:"@",
                label:"@",
                model:"="
            },

            transclude: true,
            link: function (scope, element, attrs, ctrl,transclude) {


            },
            controller: function ($scope,$element ,$transclude,$timeout) {
              if(!$scope.type)
              {
                  $scope.type="text";
              }



                if($scope.type == 'custom')
                {
                    $timeout(function () {
                    //DOM has finished rendering
                        var transcludeElements = $transclude();

                        for(var i = 0;i<transcludeElements.length;i++)
                        {
                            $element.find('div')[0].append(transcludeElements[i]);
                        }

                      });

                }

            },

            templateUrl:"/views/directives/field-template.html"
        };
    });