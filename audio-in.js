
var audioInput = {};

navigator.getUserMedia = (
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia
);

var audioCtx, analyser, source;

document.getElementById('start').onclick = function () {
  document.getElementById('instructions').innerHTML = ''
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  analyser.minDecibels = -130; // inverse relationship with sensitivity?
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  navigator.getUserMedia(
    { audio: true },
    function success(stream) {
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      visualize();
      start();
    },
    function failure(err) {
      console.log('The following gUM error occured: ' + err);
    }
  );
}

var cap = 46;
function modifyGrid(input) {
  var sum = 0;
  var max = 0;

  for (var i = 0; i < cap; i++) {
    var val = input[i];

    max = Math.max(max, val);
    sum += val;
  }

  audioInput.data = input.slice(0, cap);
  audioInput.max = max;
  audioInput.avg = sum / cap;
}

function visualize(thing) {
  analyser.fftSize = 256;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    modifyGrid(dataArray);
  };

  draw();
}
