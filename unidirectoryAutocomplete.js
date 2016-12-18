function unidirectoryAutocompleteCtrl($http, $q, UnidirectoryService) {
    var self = this;

    self.data = null;
    self.selectedItem = null;
    self.searchText = null;
    self.UnidirectoryService = UnidirectoryService;

    self.querySearch = function(query) {
        var promise = UnidirectoryService.search(query);
        promise.then(function(response) {
          self.data = response;
        });
    };
}
angular.module('MyApp').controller('unidirectoryAutocompleteCtrl', unidirectoryAutocompleteCtrl);
