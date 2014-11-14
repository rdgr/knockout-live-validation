var LiveValidation = {

  _propertyName : '',

  buildRulesContainer : function (viewModel, valueAccessor, element) {
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
      })
      for (var i in uniqueArrayRules) {
        var propertyName = uniqueArrayRules[i];
        $(element).parent().find('.liveValidationContainer').remove();
        $(element).parent().append('<div class="liveValidationContainer" style="border:1px solid black;"><ul></ul></div>');
        var container = $(element).parent().find('.liveValidationContainer');
        //container.hide();
      }
    }
  },

  updateRules : function (element, valueAccessor, allBindingsAccessor, viewModel) {

    var observableObject = valueAccessor();
    var valueUnwrapped = ko.unwrap(observableObject);
    var rules = observableObject.rules();
    $(element).nextAll('.liveValidationContainer').find('li').remove();

    for (var _rule in rules) {
      var msg = ko.validation.rules[rules[_rule].rule];
      var formattedMessage = ko.validation.formatMessage(msg.message, rules[_rule].params);
      var isValidRule = ko.validation.rules[rules[_rule].rule].validator(observableObject(), rules[_rule].params);
      $(element).nextAll('.liveValidationContainer').append('<li>'+formattedMessage+ ' -> '+ isValidRule  + '</li>');
    }

  }

}
