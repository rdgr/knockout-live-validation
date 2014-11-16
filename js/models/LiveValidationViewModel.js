var LiveValidationViewModel = {
  firstName: ko.observable().extend({
    required: true,
    minLength: 2,
    maxLength: 10
  }),
  lastName: ko.observable().extend({ required: true }),
  myField: ko.observable().extend({
    lastLetter: 'r',
    firstLetter: 'g',
    required: true
  }),
  myTextarea: ko.observable('Preset value of my textarea'),
  subscriptionOptions: ['Technology', 'Music'],
  subscription: ko.observable().extend({ required: true }),
  submit: function () {
    if (this.errors().length == 0) {
      alert('Thank you.');
    } else {
      console.log('Please check your submission.')
      LiveValidation.showAllErrors();
      this.errors.showAllMessages(); // --> Default ko validation messages.
    }
  }
};

LiveValidationViewModel.errors = ko.validation.group(LiveValidationViewModel);
