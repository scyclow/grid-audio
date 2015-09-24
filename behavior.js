var colors = new ColorPalette; // colors.js
var growths = [new Growth(START, colors.sample(false))]; //growth.js

function run() {
  var size = renderAudio();
  auto.run();
  renderGrowths();
  warpCells(size); // warp.js
}

function start() {
  setInterval(run, TIME);
  setInterval(()=>updateMeter(audioInput), TIME*4);
};

function AudioState(threshold, callback) {
  this.threshold = threshold;
  this.callback = callback;
  this.aboveThreshold = false;
};

AudioState.prototype.checkThreshold = function(num, ignore) {
  if (num > this.threshold && (ignore || !this.aboveThreshold)) {
    this.callback();
    this.aboveThreshold = true;
  } else if (num < this.threshold && this.aboveThreshold) {
    this.aboveThreshold = false;
  }
};

var generalEvent = () => {
  randExec(0.2, ()=>colors.changeBase());
  randExec(0.2, erase);
  newGrowth();
}

var avgEvent = new AudioState(EVENT_THRESHOLDS[0], () => {
  colors.changeBase();
  generalEvent();
});

var middleEvent = new AudioState(EVENT_THRESHOLDS[1], generalEvent);

var lastEvent = new AudioState(EVENT_THRESHOLDS[2], generalEvent);

var failsafe = () => auto.active = audioInput.avg>FAILSAFE_THRESHOLD;


function renderAudio() {
  var avg = audioInput.avg;
  var data = audioInput.data;

  avgEvent.checkThreshold(avg);
  middleEvent.checkThreshold(Math.abs(audioInput.data[20] - audioInput.avg));
  lastEvent.checkThreshold(audioInput.max - audioInput.data[45]);

  failsafe();

  return  Math.pow(CELLSIZE, (avg/AUDIO_SIZE_THRESHOLD));
}

///// METER /////
var meterArr = [];
var meterLen = 45;
var meterStep = 5;
var meter = document.getElementById('meter');
var cellAdj = document.createElement('div');
cellAdj.setAttribute('id', 'cell-adj');
cellAdj.setAttribute('class', 'special');
var meterAvg = document.createElement('div');
meterAvg.setAttribute('id', 'meter-avg');
meterAvg.setAttribute('class', 'special');
var sense = document.createElement('div');
sense.setAttribute('id', 'sense');
sense.setAttribute('class', 'special');

for (var i=0; i<=meterLen; i+=meterStep) {
  var out = document.createElement('div');
  out.setAttribute('id', 'out-'+i);
  out.setAttribute('class', 'output');
  meterArr[i] = out;
  meter.appendChild(out);
}
meter.appendChild(cellAdj);
meter.appendChild(meterAvg);
meter.appendChild(sense);

function updateMeter(input) {
  for (var i=0; i<=meterLen; i+=meterStep) {
    var elm = meterArr[i];
    if (elm) elm.innerHTML = input.data[i];
  }
  cellAdj.innerHTML = CELL_SIZE_ADJ.toFixed(1);
  meterAvg.innerHTML = input.avg.toFixed(1);
  sense.innerHTML = analyser.minDecibels;
}

var meterVisible = false;
var meter = document.getElementById('meter');
function toggleMeter() {
  meterVisible = !meterVisible;
  meter.style['visibility'] = meterVisible ? 'visible' : 'hidden';
}


//// KEYDOWN ////
window.onkeydown = function(e){
  switch (e.keyCode) {
    case 32: erase(); break;// spacebar
    case 67: newGrowth(1); break;// c
    case 86: newGrowth(2); break;// v
    case 66: newGrowth(3); break;// b
    case 78: newGrowth(4); break;// n
    case 77: newGrowth(5); break;// m
    case 68: colors.changeBase(0); break;// d
    case 70: colors.changeBase(1); break;// f
    case 71: colors.changeBase(2); break;// g
    case 72: colors.changeBase(3); break;// h
    case 74: colors.changeBase(4); break;// j
    case 75: colors.changeBase(5); break;// k
    case 38: changeCellSize(0.1); break;// up
    case 40: changeCellSize(-0.1); break;// down
    case 37: changeCellRadius(-0.1); break;// left
    case 39: changeCellRadius(0.1); break;// right
    case 27: auto.toggle(); break;// escape
    case 189: analyser.minDecibels += 10; break;// -
    case 187: analyser.minDecibels -= 10; break;// +
    case 192: toggleMeter(); break;// `
  }
  // if (e.keyCode === 32) { erase(); } // spacebar
  // if (e.keyCode === 67) { newGrowth(1); } // c
  // if (e.keyCode === 86) { newGrowth(2); } // v
  // if (e.keyCode === 66) { newGrowth(3); } // b
  // if (e.keyCode === 78) { newGrowth(4); } // n
  // if (e.keyCode === 77) { newGrowth(5); } // m

  // if (e.keyCode === 68) { colors.changeBase(0); } // d
  // if (e.keyCode === 70) { colors.changeBase(1); } // f
  // if (e.keyCode === 71) { colors.changeBase(2); } // g
  // if (e.keyCode === 72) { colors.changeBase(3); } // h
  // if (e.keyCode === 74) { colors.changeBase(4); } // j
  // if (e.keyCode === 75) { colors.changeBase(5); } // k

  // if (e.keyCode === 38) { changeCellSize(0.1); } // up
  // if (e.keyCode === 40) { changeCellSize(-0.1); } // down
  // if (e.keyCode === 37) { changeCellRadius(-0.1); } // left
  // if (e.keyCode === 39) { changeCellRadius(0.1); } // right

  // if (e.keyCode === 27) { auto.toggle(); } // escape
}
