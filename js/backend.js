'use strict';

(function () {

  var load = function (onSuc, onErr) {

    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/code-and-magick/data';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error = '';
      switch (xhr.status) {
        case 200:
          onSuc(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onErr(error);
      }
    });

    xhr.timeout = 5000;
    xhr.open('GET', URL, true);

    xhr.addEventListener('timeout', function () {
      window.render.renderError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send();
  };

  var save = function (data, onSuc, onErr) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/code-and-magick';

    xhr.addEventListener('load', function () {
      var error = '';
      switch (xhr.status) {
        case 200:
          onSuc(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onErr(error);
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };


  window.backend = {
    load: load,
    save: save
  };
})();
