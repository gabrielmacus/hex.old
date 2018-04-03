

var app = angular.module("app", [ 'ng-sortable','ngSanitize','ngAnimate',"checklist-model","ngRoute","pascalprecht.translate",'ngCookies','ngTagsInput']);
app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
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


