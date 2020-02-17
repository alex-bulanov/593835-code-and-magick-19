'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var similarListElements = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // ф-ция отрисовки похожих волшебников.
  var renderWizard = function (object) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var currentWizard = object;

    wizardElement.querySelector('.setup-similar-label').textContent = currentWizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = currentWizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = currentWizard.colorEyes;
    similarListElements.appendChild(wizardElement);
  };

  var renderWizards = function (data) {
    similarListElements.innerHTML = '';
    var takeNum = data.length > 4 ? 4 : data.length;
    for (var i = 0; i < takeNum; i++) {
      window.render.renderWizard(data[i]);
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
    renderError: renderError,
    renderWizards: renderWizards
  };
})();

