TIME = 30;//ms

AUTO = {};
AUTO.GROWTH = 0.6;
AUTO.ERASE = 0.1;

CELL_SIZE_ADJ = 1;
CELL_RAD_ADJ = 2;
CELLSIZE = 40;//px
SCREEN_ADJ = 0.95;

FAILSAFE_THRESHOLD = 180;
AUDIO_SIZE_THRESHOLD = 190;
EVENT_THRESHOLDS = [170, 30, 40];

window.autoGrowth  = (n) => n ? (AUTO.GROWTH = n) : console.log(AUTO.GROWTH);
window.autoErase  = (n) => n ? (AUTO.ERASE = n) : console.log(AUTO.ERASE);
window.cellSizeAdj = (n) => n ? (CELL_SIZE_ADJ = n) : console.log(CELL_SIZE_ADJ);
window.cellRad = (n) => n ? (CELL_RAD_ADJ = n) : console.log(CELL_RAD_ADJ);
window.cellSize   = (n) => n ? (CELLSIZE = n) : console.log(CELLSIZE);
window.failsafe = (n) => n ? (FAILSAFE_THRESHOLD = n) : console.log(FAILSAFE_THRESHOLD);
window.audioSize = (n) => n ? (AUDIO_SIZE_THRESHOLD = n) : console.log(AUDIO_SIZE_THRESHOLD);
window.eventThresh  = (i, n) => n ? (EVENT_THRESHOLDS[i] = n) : console.log(EVENT_THRESHOLDS[i]);

window.sense = (n) => analyser.minDecibels += n;
