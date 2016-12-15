function DemoCtrl($http, $q, auDirService) {
    var self = this;

    self.data = null;
    self.selectedItem = null;
    self.searchText = null;
    self.auDirService = auDirService;

    self.querySearch = function(query) {
        var promise = auDirService.search(query);
        promise.then(function(response) {
          self.data = response.searchResults;
        });
    };
}
angular.module('MyApp').controller('DemoCtrl', DemoCtrl);
