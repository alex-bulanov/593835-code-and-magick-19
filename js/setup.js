'use strict';

var MIN_NAME_LENGTH = 2;

var wizards;


var coatColors = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
var form = userDialog.querySelector('.setup-wizard-form');

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');


// Открытие/закрытие окна настройки персонажа.

var setupOpen = document.querySelector('.setup-open');
var setupCloseButton = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
var setupUserCoatColor = userDialog.querySelector('[name = coat-color]');
var setupUserEyesColor = userDialog.querySelector('[name = eyes-color]');


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
  window.event.isEnterEvent(evt, closePopup());
};

var onPopupEnterPress = function (evt) {
  window.event.isEnterEvent(evt, openPopup());
};

var onCloseButtonEnterPress = function (evt) {
  window.event.isEnterEvent(evt, closePopup());
};

var onLoad = function (data) {
  wizards = data;
  updateWizards();
};

var onSave = function () {
  updateWizards();
};

var onError = function (message) {
  window.render.renderError(message);
};

setupOpen.addEventListener('click', openPopup);
setupOpen.addEventListener('keydown', onPopupEnterPress);
setupCloseButton.addEventListener('click', closePopup);
setupCloseButton.addEventListener('keydown', onCloseButtonEnterPress);


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

// Изменение цвета мантии персонажа по нажатию.

var wizardCoat = userDialog.querySelector('.wizard-coat');
var coatColor = wizardCoat.style.fill;

var onClickCoatSetColor = function () {

  var currentColor = window.getRandomElement(coatColors);
  // Убераем пробел в строке "rgb (xxx, yyy, zzz)"
  currentColor = (currentColor.slice(0, 3) + currentColor.slice(4));
  wizardCoat.style.fill = currentColor;
  setupUserCoatColor.value = currentColor;
  coatColor = currentColor;
  window.debounce(updateWizards);
};


wizardCoat.addEventListener('click', onClickCoatSetColor);

// Изменение цвета глаз персонажа по нажатию.

var wizardEyes = userDialog.querySelector('.wizard-eyes');
var eyesColor = wizardEyes.style.fill;

var onClickEyesSetColor = function () {
  var currentColor = window.getRandomElement(eyesColors);
  wizardEyes.style.fill = currentColor;
  setupUserEyesColor.value = currentColor;
  eyesColor = currentColor;
  window.debounce(updateWizards);

};

wizardEyes.addEventListener('click', onClickEyesSetColor);

// Изменение цвета фаерболов по нажатию.

var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var fireballColorInput = userDialog.querySelector('input[name=fireball-color]');

var onClickFireballSetColor = function () {
  var currentColor = window.getRandomElement(fireballColor);
  wizardFireball.style.background = currentColor;
  fireballColorInput.value = currentColor;
};

wizardFireball.addEventListener('click', onClickFireballSetColor);

// Сортировка.

var getRank = function (wizard) {
  var rank = 0;

  if (wizard.colorCoat === coatColor) {
    rank += 2;
  }

  if (wizard.colorEyes === eyesColor) {
    rank += 1;
  }

  return rank;
};

var compareNames = function (left, right) {
  if (left > right) {
    return 1;
  } else if (left < right) {
    return -1;
  } else {
    return 0;
  }
};

var updateWizards = function () {
  var rankedWizards = wizards.sort(function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = compareNames(left.name, right.name);
    }
    return rankDiff;
  });

  window.render.renderWizards(rankedWizards);
};


window.backend.load(onLoad, onError);

form.addEventListener('submit', function (evt) {

  window.backend.save(new FormData(form), onSave, onError);
  userDialog.classList.add('hidden');

  evt.preventDefault();
});


