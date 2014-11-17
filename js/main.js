$(function() {

    ko.bindingHandlers.liveValidation = {
      init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        LiveValidation.addEvents(viewModel, valueAccessor, element);
        LiveValidation.buildRulesContainer(viewModel, valueAccessor, element);
        LiveValidation.updateRules(element, valueAccessor, allBindingsAccessor, viewModel);
      },
      update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        LiveValidation.updateRules(element, valueAccessor, allBindings, viewModel);
      }
    };

    ko.applyBindings(LiveValidationViewModel);

  });

});
