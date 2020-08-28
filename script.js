game = {
  depth: new Decimal(0),
  coins: new Decimal(0),
  cursor: new Decimal(0),
  dealed: new Decimal(0),
  lastTick: Date.now(),
  mainTab: 1
};
load();
Tab(game.mainTab)

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.lastTick;
  loop(deltaTime);
  game.lastTick = Date.now()
}, 0);

function loop(unadjusted, off = 0) {
  game.dealed = (game.dealed).add(new Decimal(0).div(1000).times(unadjusted));
  game.depth = getDepth(game.dealed);
  game.coins = (game.coins).add(getCoinPerSecond().div(1000).times(unadjusted))
  document.getElementById("depth").innerHTML = "Your depth is currently " + game.depth.floor() + " meter"
  document.getElementById("health").innerHTML = "Your health on this block is currently " + getHealth(game.depth).sub(game.dealed).toFixed(2) + "/" + getHealth(game.depth).sub(getHealth(game.depth.sub(1))).toFixed(2)
  document.getElementById("coins").innerHTML = "You have " + game.coins.toFixed(2) + " coins (+" + getCoinPerSecond().toFixed(2) + "/s)"
}
