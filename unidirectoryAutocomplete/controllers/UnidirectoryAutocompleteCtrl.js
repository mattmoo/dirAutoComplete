function UnidirectoryAutocompleteCtrl($http, $log, $scope, UnidirectoryService, UNIDIRECTORY_AUTOCOMPLETE_CONSTANTS) {
    var ctrl = this;

    ctrl.selectedItem = null;
    ctrl.searchText = null;
    ctrl.UnidirectoryService = UnidirectoryService;
    ctrl.UNIDIRECTORY_AUTOCOMPLETE_CONSTANTS = UNIDIRECTORY_AUTOCOMPLETE_CONSTANTS;

    ctrl.querySearch = function(query) {
      return ctrl.UnidirectoryService.querySearch(query);
    };

}
angular.module('UnidirectoryAutocomplete').controller('UnidirectoryAutocompleteCtrl', UnidirectoryAutocompleteCtrl);
