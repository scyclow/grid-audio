
var auto = {
  active: false,
  TIME: 75,
  PROB: 0.5,

  toggle: function() {
    auto.active = !auto.active;
  },

  run: function() {
    if (auto.active) {
      randExec(auto.PROB, auto.brainfuck)
    }
  },

  brainfuck: function() {
    var gColor = Math.ceil( Math.random()*5 );
    var bColor = Math.floor( Math.random()*6 );

    randExec(AUTO.GROWTH, newGrowth, gColor);
    randExec(AUTO.GROWTH, colors.changeBase, bColor);

    randExec(AUTO.ERASE, erase);
  }
}

function randExec(prob, cmd, arg) {
  if (Math.random() < prob) {
    cmd(arg);
  }
}
