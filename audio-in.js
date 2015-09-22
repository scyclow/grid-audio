
var audioInput = {};

navigator.getUserMedia = (
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia
);

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var analyser = audioCtx.createAnalyser();
analyser.minDecibels = -130; // inverse relationship with sensitivity?
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

var source;
navigator.getUserMedia (
  { audio: true },
  function success(stream) {
     source = audioCtx.createMediaStreamSource(stream);
     source.connect(analyser);

     visualize();
  },
  function failure(err) {
     console.log('The following gUM error occured: ' + err);
  }
);

function modifyGrid(input) {
  var sum = 0, len = input.length;
  var max = 0;
  var zeroCount = 0

  for (var i = 0; i < len && zeroCount <= 10; i++) {
    var val = input[i];
    zeroCount = val ? 0 : zeroCount + 1;

    max = Math.max(max, val);
    sum += val;
  }

  audioInput.len = i - zeroCount;
  // audioInput.data = input.slice(0, audioInput.len);
  // audioInput.max = max;
  audioInput.avg = sum / audioInput.len;
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
