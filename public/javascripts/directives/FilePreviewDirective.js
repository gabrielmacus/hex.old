
app
    .directive('filePreview', function counter() {
        return {
            restrict:"E",
            scope: {
                file:"="
            },
            transclude:true,

            link: function (scope, element, attrs) {


            },
            controller: function ($scope) {

                $scope.getType=function (mime) {
 
                    switch (true)
                    {
                        case (mime.indexOf("image/")>-1):
                            return 'image';

                            break;

                        case (mime.indexOf("video/")>-1):
                            return 'video';
                            break;

                        default:
                            return 'binary';
                            break;
                    }


                }

            },

            templateUrl:"/views/directives/file-preview-template.html"
        };
    });