game = {
  depth: new Decimal(0),
  coins: new Decimal(0),
  cursor: new Decimal(0),
  dealed: new Decimal(0),
  lastTick: Date.now()
}

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.lastTick;
  loop(deltaTime);
  game.lastTick = Date.now()
}, 0);

function loop(unadjusted, off = 0) {
  game.dealed = (game.dealed).add(unadjusted/1000*0)
  document.getElementById("depth").innerHTML = "Your depth is currently " + game.depth.toFixed(0) + " meter"
  document.getElementById("health").innerHTML = "Your health on this block is currently " + new Decimal(1).sub(game.dealed)
}

function click() {
  game.dealed = (game.dealed).add(0.01)
}
