app.controller('file-list-controller', function ($scope,$rootScope,$controller,$routeParams,$location) {

    $routeParams.model="file";

    $controller('list-controller',{$scope:$scope,$routeParams:$routeParams});

    $scope.query.gallery = $routeParams.id;

});