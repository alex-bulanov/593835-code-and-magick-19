'use strict';

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var MIN_NAME_LENGTH = 2;

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
// userDialog.classList.remove('hidden');

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

// Открытие/закрытие окна настройки персонажа.

var setupOpen = document.querySelector('.setup-open');
var setupCloseButton = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);

  setupUserName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });

  setupUserName.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var onPopupEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
};

var onCloseCloseButtonEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
};

setupOpen.addEventListener('click', openPopup);
setupOpen.addEventListener('keydown', onPopupEnterPress);
setupCloseButton.addEventListener('click', closePopup);
setupCloseButton.addEventListener('keydown', onCloseCloseButtonEnterPress);

// Валидация ввода имени персонажа.

var userNameInput = userDialog.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя персонажа не может содержать менее 2 символов.');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов.');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity('Имя должно состоять минимум из ' +
      MIN_NAME_LENGTH +
      '-х символов.'
    );
  } else {
    target.setCustomValidity('');
  }
});

