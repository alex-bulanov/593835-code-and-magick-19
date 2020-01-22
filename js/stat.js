'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 0;
var GAP = 10;
var FONT_GAP = 16;
var BAR_WIDTH = 40;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + 5 * GAP, 5 * GAP);
  ctx.fillText('Список результатов: ', CLOUD_X + 5 * GAP, 7 * GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], CLOUD_X + (5 * (i + 1) * GAP) + (i * BAR_WIDTH), CLOUD_HEIGHT - 2 * FONT_GAP);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var barColor = 'hsl(240, ' + Math.floor(Math.random() * Math.floor(100)) + '%, ' + '50%';
      ctx.fillStyle = barColor;
    }

    ctx.fillRect(CLOUD_X + (5 * (i + 1) * GAP) + (i * BAR_WIDTH), CLOUD_HEIGHT - 3 * FONT_GAP, BAR_WIDTH, -(2 * BAR_WIDTH * times[i]) / maxTime);
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + (5 * (i + 1) * GAP) + (i * BAR_WIDTH), CLOUD_HEIGHT - 5 * FONT_GAP - (2 * BAR_WIDTH * times[i]) / maxTime);
  }
};

