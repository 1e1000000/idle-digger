game = {
  depth: new Decimal(0),
  coins: new Decimal(0),
  cursor: {
    amount: new Decimal(0),
    bought: new Decimal(0),
    power: new Decimal(1)
  },
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

var autoSave = window.setInterval(function() {
  save()
}, 10000)

function loop(unadjusted, off = 0) {
  //update variables
  game.dealed = (game.dealed).add(new Decimal(0).div(1000).times(unadjusted));
  game.depth = getDepth(game.dealed);
  game.coins = (game.coins).add(getCoinPerSecond().div(1000).times(unadjusted));
  //update texts
  document.getElementById("depth").innerHTML = "Your depth is currently " + game.depth.floor() + " meter"
  document.getElementById("health").innerHTML = "Your health on this block is currently " + getHealth(game.depth).sub(game.dealed).toFixed(2) + "/" + getHealth(game.depth).sub(getHealth(game.depth.sub(1))).toFixed(2)
  document.getElementById("coins").innerHTML = "You have " + game.coins.toFixed(2) + " coins (+" + getCoinPerSecond().toFixed(2) + "/s)"
  document.getElementById("damage").innerHTML = "Deal Damage by " + getCursorDamage().toFixed(2)
  document.getElementById("cursorAmount").innerHTML = "Cursor: " + game.cursor.amount.floor() + " (" + game.cursor.bought + " Bought)"
  document.getElementById("cursorPower").innerHTML = "Power: 1x"
  document.getElementById("cursorCost").innerHTML = "Cost: " + getCursorCost(game.cursor.bought)
}
