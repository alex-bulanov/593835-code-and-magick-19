'use strict';

(function () {
  window.creatingWizard = function (wizNames, wizSurnames, wizCoatColors, wizEyesColors) {
    var object = {
      name: window.randomElement(wizNames),
      surname: window.randomElement(wizSurnames),
      coatColor: window.randomElement(wizCoatColors),
      eyesColor: window.randomElement(wizEyesColors)
    };
    return object;
  };
})();
