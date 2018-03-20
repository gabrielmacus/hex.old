
app
    .directive('frecuencyField', function counter() {
        return {
            restrict:"E",
            scope: {
                label:"@",
                timeOptions:"=",
                dayOptions:"=",
                model:"="
            },
            link: function (scope, element, attrs) {


            },
            controller: function ($scope) {

            },

            templateUrl:"/views/frecuency-field-template.html"
        };
    });