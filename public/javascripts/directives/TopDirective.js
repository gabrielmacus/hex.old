
app
    .directive('top', function counter() {
        return {
            restrict:"E",
            scope: {
                title:"="
            },

            link: function (scope, element, attrs) {


            },
            controller: function ($scope) {

            },

            templateUrl:"/views/directives/top-template.html"
        };
    });