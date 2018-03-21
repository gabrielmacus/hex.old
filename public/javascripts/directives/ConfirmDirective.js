
app
    .directive('confirm', function counter() {
        return {
            restrict:"E",
            scope: {
                options:"="
            },

            link: function (scope, element, attrs) {


            },
            controller: function ($scope) {

            },

            templateUrl:"/views/directives/confirm-template.html"
        };
    });