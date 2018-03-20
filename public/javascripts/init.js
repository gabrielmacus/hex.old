var app = angular.module("app", ['gajus.swing',"ngRoute","pascalprecht.translate",'ngCookies','ngTagsInput']);
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
        .when("/:model/save",{
            templateUrl:'/views/save.html',
            controller:'save-controller'
        })

});
