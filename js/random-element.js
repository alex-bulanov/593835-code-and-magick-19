'use strict';

(function () {
  window.getRandomElement = function (elements) {
    var max = elements.length - 1;
    var min = 0;
    return elements[Math.floor(Math.random() * (max - min + 1) + min)];
  };
})();
