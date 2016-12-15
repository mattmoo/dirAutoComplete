function movieService($http, $log, $q) {
    var movieService = this;
    movieService.searchResults = [];


    movieService.search = function(movie) {
        var deferred = $q.defer();
        $http.get('http://www.omdbapi.com/?s=' + movie)
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
angular.module('MyApp').service('movieService', movieService);
