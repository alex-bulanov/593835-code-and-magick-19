'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElement = function (arr) {
  var max = arr.length - 1;
  var min = 0;
  return arr[Math.floor(Math.random() * (max - min + 1) + min)];
};

var creatingWizard = function (wizNames, wizSurnames, wizCoatColors, wizEyesColors) {
  var object = {
    name: getRandomElement(wizNames),
    surname: getRandomElement(wizSurnames),
    coatColor: getRandomElement(wizCoatColors),
    eyesColor: getRandomElement(wizEyesColors)
  };
  return object;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

for (var i = 0; i < 4; i++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  var currentWizard = creatingWizard(names, surnames, coatColors, eyesColors);
  wizardElement.querySelector('.setup-similar-label').textContent = currentWizard.name + ' ' + currentWizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = currentWizard.coatColor.slice(0, 3) + currentWizard.coatColor.slice(4);
  wizardElement.querySelector('.wizard-eyes').style.fill = currentWizard.eyesColor;
  similarListElement.appendChild(wizardElement);
}

