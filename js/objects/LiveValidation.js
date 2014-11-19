var LiveValidation = (function(){

  var
  addEvents = function ( viewModel, valueAccessor, element ) {
    $(element).on('focus', function() {
      $(this).nextAll('.liveValidationContainer').slideDown(200);
    });
    $(element).on('blur', function() {
      var container = $(this).nextAll('.liveValidationContainer');
      container.data( "valid", valueAccessor().isValid().toString() );
      if (valueAccessor().isValid()) {
        container.slideUp(200);
      }
    });
  },

  showAllErrors = function () {
    $('.liveValidationContainer').each(function () {
      if (!$(this).data("valid") || $(this).data("valid") === "false") {
        $(this).slideDown(200);
      }
    });
  },

  buildRulesContainer = function (viewModel, valueAccessor, element) {
    if (valueAccessor && element) {
      valueAccessor().extend({element: element });
      var rulesByField = [];
      for (var property in viewModel) {
        var propertyName = property.toString();
        if (viewModel[propertyName].rules) {
          var rulesByProperty = viewModel[propertyName].rules();
          for (var propertyRuleIndex in rulesByProperty) {
            rulesByField.push(propertyName);
          }
        }
      }
      var uniqueArrayRules = rulesByField.filter(function(item, pos) {
        return rulesByField.indexOf(item) == pos;
      });
      for (var i in uniqueArrayRules) {
        $(element).next('.validationMessage').remove(); // Removes Knockout Validation span message.
        $(element).parent().find('.liveValidationContainer').remove();
        $(element).parent().append('<div class="liveValidationContainer rulesbox"><ul></ul></div>');
      }
    }
  },

  updateRules = function (element, valueAccessor, allBindingsAccessor, viewModel) {
    var observableObject = valueAccessor();
    var valueUnwrapped = ko.unwrap(observableObject);
    var rules = observableObject.rules();
    $(element).nextAll('.liveValidationContainer').find('li').remove();

    for (var _rule in rules) {
      var msg = ko.validation.rules[rules[_rule].rule];
      var formattedMessage = ko.validation.formatMessage(msg.message, rules[_rule].params);
      var isValidRule = ko.validation.rules[rules[_rule].rule].validator(observableObject(), rules[_rule].params);
      var sValid = isValidRule ? "valid" : "invalid";
      $(element).nextAll('.liveValidationContainer').find('ul').append('<li><div class="rulesbox-bullet rulesbox-bullet-' + sValid + '"></div><span>'+formattedMessage+ '</span></li>');
    }
  };

  return {
    addEvents : addEvents,
    showAllErrors : showAllErrors,
    buildRulesContainer : buildRulesContainer,
    updateRules : updateRules
  };

})();
