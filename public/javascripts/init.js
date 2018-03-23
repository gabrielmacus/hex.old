var app = angular.module("app", ['ngSanitize','ngAnimate',"checklist-model",'gajus.swing',"ngRoute","pascalprecht.translate",'ngCookies','ngTagsInput']);

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/main-login.html",
            controller: "login-controller"
        })

});
app.config(['$translateProvider', function ($translateProvider, $translatePartialLoaderProvider) {
    $translateProvider.useStaticFilesLoader({
        files: [
            {
                prefix: '/locales/',
                suffix: '.json'
            }]
    });
    $translateProvider.preferredLanguage('es');
}]);
var actionRoute = {
    templateUrl:function (params) {
        return '/views/'+params.action+'.html';
    },
    controller:function ($scope,$routeParams) {
        $scope.action = $routeParams.action;
        $scope.model  = $routeParams.model;
    }
};

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/main.html",
            controller:"main-controller"
        })
        .when("/:model", {
            templateUrl: '/views/list.html',
            controller:"list-controller"
        })
        .when('/:model/save',
            {
                templateUrl:'/views/save.html',
                controller:'save-controller'
            })
        .when("/:model/:id/save",{
            templateUrl:'/views/save.html',
            controller:'save-controller'
        })
        .when("/:model/:action",actionRoute)
        .when("/:model/:id/:action",actionRoute)

});
