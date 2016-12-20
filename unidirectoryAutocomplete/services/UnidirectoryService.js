function UnidirectoryService($http, $log, $q, UNIDIRECTORY_AUTOCOMPLETE_CONSTANTS) {
    var UnidirectoryService = this;
    UnidirectoryService.searchResults = [];

    console.log(UNIDIRECTORY_AUTOCOMPLETE_CONSTANTS.CLICK);

    UnidirectoryService.url = 'https://unidirectory.auckland.ac.nz';
    UnidirectoryService.cropping_php = 'php\\picture_crop.php?img_path=';
    UnidirectoryService.search_php = 'php\\unidirectory_interface.php';
    UnidirectoryService.defaultPicPath = 'icons\\user.png';

    //Search university directory, update search results in the service, and return a promise
    UnidirectoryService.querySearch = function(searchString) {
      var deferred = $q.defer();
      $http.post(UNIDIRECTORY_AUTOCOMPLETE_CONSTANTS.SEARCH_PHP, searchString)
          .success(function(data) {
              UnidirectoryService.searchResults = data.profiles;
              deferred.resolve(data.profiles);
          }).error(function(msg, code) {
              deferred.reject(msg);
              $log.error(msg, code);
          });
      return deferred.promise;
    };

}
angular.module('UnidirectoryAutocomplete').service('UnidirectoryService', UnidirectoryService);
