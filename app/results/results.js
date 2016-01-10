'use strict';
app.controller("resultsCtrl", function ($scope) {
    $scope.track = {};
    $scope.emptyImg= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    $scope.artworkUrl = 'artwork_url' in $scope.track ? $scope.track.artwork_url : $scope.emptyImg;
    $scope.playerElt = document.getElementById('sc_player');

    $scope.playTrack = function () {
        $scope.playerElt.innerHTML = "<div class='loader'></div>";
        
        if($scope.track && 'uri' in $scope.track && $scope.track.uri){
            SC.oEmbed($scope.track.uri, {
                auto_play: true,
                maxheight: 166,
                element: $scope.playerElt
            }).then(function(oEmbed) {

            });
        }
    };

    $scope.$on('TrackSelect', function (event, track) {
        $scope.playerElt.innerHTML = "";
        if(track && 'artwork_url' in track && track.artwork_url){
            $scope.artworkUrl = track.artwork_url.replace('-large', '-t300x300');
        } else {
            $scope.artworkUrl = $scope.emptyImg;
        }
        $scope.track = track;
    });

})
    .directive('resultsPane', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/results/results.html',
            controller: 'resultsCtrl'
        };
    });