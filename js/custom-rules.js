ko.validation.init();
ko.validation.configure({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true,
    messageTemplate: null
});

ko.validation.rules['firstLetter'] = {
  getValue: function (obs) {
      return (typeof obs === 'function' ? obs() : obs);
  },
  validator: function (val, otherVal) {
      if (val === undefined) return false;
      return val.substring(0,1).toLowerCase() == otherVal.toLowerCase();
  },
  message: 'First letter must be {0}'
};

ko.validation.rules["lastLetter"] = {
  validator: function (val, otherVal) {
    if (val === undefined) return false;
    return val.substr(-1).toLowerCase() == otherVal.toLowerCase();
  },
  message: "Last letter must be '{0}'"
};

ko.validation.rules['mustEqual'] = {
  validator: function (val, otherVal) {
      return val === otherVal;
  },
  message: 'The field must equal {0}'
};

ko.validation.registerExtenders();
