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
  game.dealed = (game.dealed).add(unadjusted/1000*0);
  game.depth = getDepth(game.dealed);
  game.coin = (game.coin).add(getCoinPerSecond().div(1000).times(unadjusted))
  document.getElementById("depth").innerHTML = "Your depth is currently " + game.depth.toFixed(0) + " meter"
  document.getElementById("health").innerHTML = "Your health on this block is currently " + getHealth(game.depth).sub(game.dealed).toFixed(2)
  document.getElementById("health").innerHTML = "You have " + game.coin.toFixed(2) + " coins"
}
