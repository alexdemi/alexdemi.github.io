'use strict';
app.controller("recentCtrl", function ($scope, $rootScope) {
    $scope.recentResults = [];

    $scope.loadFromStorage = function () {
        $scope.recentResults = localStorage.getItem("recentResults") ? Object.keys(JSON.parse(localStorage.getItem("recentResults"))) : [];
    };
    
    $scope.searchAgain = function (item) {
        $rootScope.$broadcast('SearchAgain', item);
    };
    
    $scope.$on("LoadFromStorage", function (event) {
        $scope.loadFromStorage();
    });

    $scope.loadFromStorage();

})
    .directive('recentPane', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/recent/recent.html',
            controller: 'recentCtrl'
        };
    });