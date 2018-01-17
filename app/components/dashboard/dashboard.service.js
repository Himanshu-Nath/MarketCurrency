angular.module('myApp')

    .factory('DashboardService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
        var DashboardService = {};

        DashboardService.getCurrencyList = function () {
            var deferred = $q.defer();
            $http.get('/api/markets/list')
                .then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject("Error");
                });
            return deferred.promise;
        }

        DashboardService.getCurrencyByFilter = function () {
            var deferred = $q.defer();
            $http.get('/api/markets/list')
                .then(function successCallback(response) {
                    deferred.resolve(response.data);
                }, function errorCallback(response) {
                    deferred.reject("Error");
                });
            return deferred.promise;
        }
        return DashboardService;
    }
    ]);