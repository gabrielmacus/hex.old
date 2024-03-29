app.controller('list-controller', function ($scope,$rootScope,$routeParams,$window,$location,$controller) {

    $scope.url ="/api/".concat($routeParams.model);

    $scope.model=$routeParams.model;

    $rootScope.bodyClass ={"list":true};
    $rootScope.bodyClass[$scope.model] = true;

    $scope.query = {page:1,sort:"-createdAt"};
    $scope.items = [];

    $scope.actions = ($rootScope.config[$routeParams.model].actions)?$rootScope.config[$routeParams.model].actions:$rootScope.defaultActions;

    $scope.saveUrl = ($rootScope.config[$routeParams.model].saveUrl)?$rootScope.config[$routeParams.model].saveUrl:false;

    $scope.pagination = {};
    $scope.fields = $scope.config[$routeParams.model].fields;


    $scope.status='loading';

    $scope.goTo=function(pag)
    {
        $scope.query.page = pag;
        $scope.loadList();
    }

    $scope.loadList=function () {

        $scope.status='loading';

        axios({url:$scope.url,params:$scope.query,method:"get",headers:$scope.headers})

            .then(function (response) {

                if(response.data.docs.length == 0 && $scope.pagination.page > 1)
                {
                    $scope.goTo($scope.pagination.page - 1);
                }
                else
                {
                    $scope.items = response.data.docs;
                    $scope.pagination = response.data.pagination;
                    $scope.status='loaded';
                }
                $scope.$apply();


            })
            .catch($rootScope.errorHandler);

    }

    $rootScope.deleteElement=function (id) {

        axios.delete('/api/'+$routeParams.model+'/'+id,{headers:$rootScope.headers})
            .then(function (response) {

                $scope.loadList();
                $scope.$apply();
            })
            .catch($rootScope.errorHandler);

    }

    $scope.acceptSelected=function () {

        var selected =$scope.items.filter(function (t) { return t.selected; })
        var qs = $location.search();

        if(qs.model)
        {

            $window.parent.postMessage({items:selected,model:qs.model},'*');
        }

    }

    $scope.loadList();

    if($rootScope.config[$routeParams.model].listController)
    {
        $controller($rootScope.config[$routeParams.model].listController,{$scope:$scope,$routeParams:$routeParams});
    }


});