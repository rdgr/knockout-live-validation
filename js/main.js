var captcha = function (val) {
  return val == 11;
};
var mustEqual = function (val, other) {
  return val == other();
};

var VanillaRunOnDomReady = function() {

  ko.validation.rules.pattern.message = 'Invalid.';
  ko.validation.configure({
      registerExtenders: true,
      messagesOnModified: true,
      insertMessages: true,
      parseInputAttributes: true,
      messageTemplate: null
  });
  ko.validation.rules["primeiraLetra"] = {
    validator: function (val, letra) {
      if (val === undefined) return false;
      return val.substring(0,1).toLowerCase() == letra.toLowerCase();
    },
    message: "primeira letra precisa ser '{0}'"
  };
  ko.validation.rules["ultimaLetra"] = {
    validator: function (val, letra) {
      if (val === undefined) return false;
      console.log('letra-'+letra)
      console.log('input-'+val.substr(-1))
      return val.substr(-1).toLowerCase() == letra.toLowerCase();
    },
    message: "ultima letra precisa ser '{0}'"
  };
  ko.validation.registerExtenders();






  addEventListener('load', function () {

    ko.bindingHandlers.hasFocus = {
      init: function(element, valueAccessor) {
        $(element).focus(function() {
          var value = valueAccessor();
          value(true);
        });
        $(element).blur(function() {
          var value = valueAccessor();
          value(false);
        });
      },
      update: function(element, valueAccessor) {
        var value = valueAccessor();
        if (ko.unwrap(value))
          element.focus();
        else
          element.blur();
      }
    };

    ko.bindingHandlers.liveValidation = {
      init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        _viewModel = viewModel;
        LiveValidation.buildRulesContainer(viewModel, valueAccessor, element);
        LiveValidation.updateRules(element, valueAccessor, allBindingsAccessor, viewModel);
      },
      update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        LiveValidation.updateRules(element, valueAccessor, allBindings, viewModel);
      }
    };
    ko.applyBindings(viewModel);
  });
}

var alreadyrunflag = 0;
if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", function(){
        alreadyrunflag=1;
        VanillaRunOnDomReady();
    }, false);
else if (document.all && !window.opera) {
    document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>');
    var contentloadtag = document.getElementById("contentloadtag")
    contentloadtag.onreadystatechange=function(){
        if (this.readyState=="complete"){
            alreadyrunflag=1;
            VanillaRunOnDomReady();
        }
    }
}

window.onload = function(){
  setTimeout("if (!alreadyrunflag){VanillaRunOnDomReady}", 0);
}
