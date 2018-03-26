
app
    .directive('lightbox', function counter() {
        return {
            restrict:"E",
            scope: {
                options:"="
            },
            transclude: true,
            link: function (scope, element, attrs) {


            },
            controller: function ($scope,$element,$timeout,$transclude,$compile) {

            },

            templateUrl:"/views/directives/lightbox-template.html"
        };
    });