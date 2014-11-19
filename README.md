Knockout Live Validation
========================

This is an experiment using Knockout Custom Validation with live rules validation. I decided to work on this when I inserted multiple rules within a knockout observable and noticed that the validation messages only appear for one error at a time.

## Dependencies

- [jQuery](http://jquery.com) (tested with version 2.1.1)
- [Knockout JS](http://knockoutjs.com) (tested with version 3.2.0)
- [Knockout Validation Plugin](https://github.com/Knockout-Contrib/Knockout-Validation)
- [Twitter Bootstrap](http://getbootstrap.com) (tested with version 3.3.1) Actually, Twitter Bootstrap is not a dependency. I just used it so my form would look beautiful :)

## Usage

Besides the dependencies mentioned above, you just have to import `LiveValidation.js` to your file and make the necessary calls. For styling purposes, the HTML structure is basically the following:

```html
<div class="liveValidationContainer rulesbox">
  <ul>
    <li>
      <div class="rulesbox-bullet rulesbox-bullet-invalid"></div>
      <span>This field is required.</span>
    </li>
  </ul>
</div>
```
The container's layout is defined by the class `.rulesbox`, the line item bullet is defined by the class `.rulesbox-bullet` and its state by the class `.rulesbox-bullet-valid` or `.rulesbox-bullet-invalid`.

Just check the file `live-validation.css` and see it for yourself.

**Your HTML input control:**

```html
<input data-bind='{value: myInput, liveValidation: myInput, valueUpdate: "afterkeydown"}' />
<button type="button" data-bind="click: submit">Submit</button>
```
  - `liveValidation: myInput` does the magic!  
  - `valueUpdate: "afterkeydown"` is necessary so the rules are validated when the user types, and not when the focus is lost.

**Your View Model with multiple rules (one default rule + one custom rule):**

```javascript
var MyViewModel = {
  myInput: ko.observable().extend({
    lastLetter: 'r',
    required: true
  }),
  submit: function () {
    if (this.errors().length == 0) {
      console.log('Your form was submitted.');
    } else {
      console.log('Please check your submission.')
    }
  }
};
```

**Adding your binding handler:**

```javascript
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
    ko.applyBindings(MyViewModel);
  });
});
```

**Your Custom Validation:**

```javascript
ko.validation.rules["lastLetter"] = {
  validator: function (val, letra) {
    if (val === undefined) return false;
    return val.substr(-1).toLowerCase() == letra.toLowerCase();
  },
  message: "Last letter must be '{0}'"
};
```

## Example

Just download the project and open **index.html**.

## Contributions

This is just an experiment that might be helpful for others. If you want to contribute to it somehow, feel free to fork it and submit your pull request.

1. Fork it ( https://github.com/rdgr/knockout-live-validation.git )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## More Info

License: [MIT](http://choosealicense.com/licenses/mit)  
Tested in Chrome 39
