function auDirService($http, $log, $q) {
    var auDirService = this;
    auDirService.searchResults = [];

    auDirService.requestHeaders = {
        'Content-Type': 'text/plain',
        'Cookie': ''
    };


    auDirService.search = function(searchString) {
        var deferred = $q.defer();
        $http.get('https://unidirectory.auckland.ac.nz/people/moar?hostKey=search&page=1&rows=20&search=' + searchString, {
                headers: auDirService.requestHeaders
            })
            .success(function(data) {
                deferred.resolve({
                    searchResults: data.Search
                });
            }).error(function(msg, code) {
                deferred.reject(msg);
                $log.error(msg, code);
            });
        return deferred.promise;
    };
}
angular.module('MyApp').service('auDirService', auDirService);
