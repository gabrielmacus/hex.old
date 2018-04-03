app.controller('streaming-watch-controller', function ($sce,$scope,$rootScope,$routeParams,$cookies,$location,$compile,$interval,$http,$controller) {


    $controller('save-controller',{$scope:$scope,$routeParams:$routeParams});

    $scope.$watch('item',function (newItem,oldItem) {

        if(newItem.path)
        {
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById('videoElement');
                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: 'ws://'+media_url+$scope.item.path+".flv"
                });

                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load();
                flvPlayer.play();
            }

        }
    })





});