CELL_SIZE_ADJ = 1;
CELL_RAD_ADJ = 2;
AUDIO_CELLSIZE = 0;

function warpCells(size) {
  var randSize = randomSize();

  forEachCellIn( Grid, {
    'height': size,
    'width': size,
    'border-radius': Math.random()*CELLSIZE*CELL_RAD_ADJ,
    'margin-top': (CELLSIZE-size)/2,
    'margin-bottom': (CELLSIZE-size)/2,
    'margin-left': (CELLSIZE-size)/2,
    'margin-right': (CELLSIZE-size)/2
  });
}

function randomSize() {
  return Math.random()*CELLSIZE*CELL_SIZE_ADJ;
}

function changeCellSize(amount) {
  CELL_SIZE_ADJ += amount;
}

function changeCellRadius(amount) {
  CELL_RAD_ADJ += amount;
}
