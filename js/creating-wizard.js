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


// (function () {
//   window.creatingWizard = function (currentObj) {
//     var object = {
//       name: currentObj.name,
//       colorCoat: currentObj.colorCoat,
//       colorEyes: currentObj.colorEyes
//     };
//     return object;
//   };
// })();
