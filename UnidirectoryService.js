function UnidirectoryService($http, $log, $q) {
    var UnidirectoryService = this;
    UnidirectoryService.searchResults = [];

    UnidirectoryService.search = function(searchString) {
        var deferred = $q.defer();
        $http.post('unidirectory_interface.php', searchString)
            .success(function(data) {
                UnidirectoryService.searchResults = data.profiles;
                deferred.resolve({
                    searchResults: data.profiles
                });
            }).error(function(msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            });
        return deferred.promise;
    };
}
angular.module('MyApp').service('UnidirectoryService', UnidirectoryService);
