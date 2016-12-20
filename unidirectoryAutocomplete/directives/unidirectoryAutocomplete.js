//Just a simple text field, with ng-messages capability.
angular.module('UnidirectoryAutocomplete').directive('unidirectoryAutocomplete', function($log) {
    return {
        templateUrl: 'partials/unidirectoryAutocomplete.html',
        controller: 'UnidirectoryAutocompleteCtrl',
        controllerAs: 'UnidirectoryAutocompleteCtrl',
        restrict: 'E',
        scope: true,
        bindToController: {
            dmpModel: '=',
            name: '@',
            label: '@?',
            rows: '@?',
            formName: '@',
            showHint: '@?',
            hintSwitchBind: '@?', //Model to bind showing hints to, defaults to 'showHint' on scope, but could be a form element (for instance)
            hint: '@?',
            required: '@?',
            requiredMessage: '@?'
        },
        compile: function(element, attrs) {

            //Insert hints
            if (attrs.hasOwnProperty('hint')) {

                attrs.hasOwnProperty('hintSwitchBind') ? (hintSwitchBind = attrs.hintSwitchBind) : (hintSwitchBind = 'showHint');

                var hintElement = document.createElement('div');
                hintElement.setAttribute('role', 'alert');
                hintElement.setAttribute('class', 'hint input');
                hintElement.setAttribute('ng-if', hintSwitchBind);

                hintElement.innerText = attrs.hint;

                element[0].firstChild.appendChild(hintElement);
            }

            //Insert required message.
            if (attrs.required) {
                //ngMessages needs to be compiled at runtime.
                var ngMessagesElement = document.createElement('div');
                ngMessagesElement.setAttribute('ng-messages', attrs.formName + '.' + attrs.name + '.$error');
                ngMessagesElement.setAttribute('role', 'alert');

                //Each ngMessage needs to be inserted here.
                //This could be extended using ngMessagesExp if it becomes necessary to have more than one error message.
                var ngMessageElement = document.createElement('div');
                ngMessageElement.setAttribute('ng-message', 'required');
                var reqMessage = '';
                attrs.hasOwnProperty('requiredMessage') ? (reqMessage = attrs.requiredMessage) : (reqMessage = 'This field is required.');
                ngMessageElement.innerText = reqMessage;
                ngMessagesElement.appendChild(ngMessageElement);


                //Insert ngmessages into md-input-container
                element[0].firstChild.appendChild(ngMessagesElement);
            }
        }
    };
});
