'use strict';
app.controller("searchCtrl", function ($scope, $rootScope, searchService) {

    $scope.query = "";
    $scope.results = [];
    $scope.errorRes = "";
    $scope.hasNext = false;
    $scope.searchLoading = false;
    

    $scope.selectItem = function (track) {
        $rootScope.$broadcast('TrackSelect', track);
    };
    
    $scope.$on("SearchAgain", function (event, query) {
        $scope.query = query;
        $scope.doSearch();
    });
    
    $scope.showResults = function (res) {
        $scope.results = res;
        $scope.hasNext = "next_href" in res ? res["next_href"] : false;
        $scope.searchLoading = false;
    };

    $scope.saveToStorage = function (item) {
        var storageRecentResults = localStorage.getItem("recentResults") ? JSON.parse(localStorage.getItem("recentResults")) : {};
        storageRecentResults[item] = item;
        localStorage.setItem("recentResults", JSON.stringify(storageRecentResults));
        $rootScope.$broadcast('LoadFromStorage');
    };
    
    $scope.search = function () {
        $scope.doSearch();
        $scope.saveToStorage($scope.query);
    };


    $scope.doSearch = function (nextUrl) {
        $scope.errorRes = "";
        $scope.searchLoading = true;

        searchService.getSearchResults($scope.query, nextUrl).
            then(function(dataResponse) {
                $scope.showResults(dataResponse.data);
            }, function(err) {
                $scope.errorRes = "API error occurs";
                $scope.searchLoading = false;
            });
    };
    
    $scope.nextResults = function () {
        $scope.doSearch($scope.hasNext);
    };

}).
    service('searchService', function($http, $rootScope) {
        this.getSearchResults = function(query, nextUrl) {
            var searchUrl = nextUrl ? nextUrl : 'https://api.soundcloud.com/tracks?client_id=' + $rootScope.clientId + '&limit=' + $rootScope.pageSize + '&linked_partitioning=1&format=json&q=' + query;
            return $http({
                method: 'GET', url: searchUrl
            });
        }
})
    .directive('searchPane', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/search/search.html',
            controller: 'searchCtrl'
        };
    });