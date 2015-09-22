TIME = 30;//ms

var colors = new ColorPalette; // colors.js
var growths = [new Growth(START, colors.sample(false))]; //growth.js

function run() {
  var size = ((audioInput.avg-50)/80) * CELLSIZE;
  document.getElementById('num').innerHTML = audioInput.avg;
  // {
    // var data = ;
    audioInput.avg > 80 ? newGrowth(Math.floor(Math.random() * 6)) : null

  // }
  renderGrowths();
  warpCells(size); // warp.js
}

document.addEventListener("DOMContentLoaded", function(event) {
  setInterval(run, TIME);
  // setInterval(auto.run, auto.TIME); // auto.js
});

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
