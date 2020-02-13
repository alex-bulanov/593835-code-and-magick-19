'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;
  var setup = document.querySelector('.setup');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // ф-ция отрисовки похожих волшебников.
  var renderWizard = function (objects) {

    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      var wizardElement = similarWizardTemplate.cloneNode(true);
      var currentWizard = objects[i];

      wizardElement.querySelector('.setup-similar-label').textContent = currentWizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = currentWizard.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = currentWizard.colorEyes;
      similarListElement.appendChild(wizardElement);
    }
  };

  var renderError = function (message) {
    var element = document.createElement('DIV');
    element.classList.add('error-message');
    element.style.width = '500px';
    element.style.height = '140px';
    element.style.position = 'absolute';
    element.style.left = '50%';
    element.style.top = '50%';
    element.style.transform = 'translate(-50%, -50%)';
    element.style.background = 'red';

    var textElement = document.createElement('p');
    textElement.textContent = message;
    textElement.style.color = '#ffffff';
    textElement.style.textAlign = 'center';
    element.appendChild(textElement);
    setup.appendChild(element);
  };

  window.render = {
    renderWizard: renderWizard,
    renderError: renderError
  };
})();

