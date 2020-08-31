game = {
  depth: new Decimal(0),
  coins: new Decimal(0),
  cursor: {
    amount: new Decimal(0),
    bought: new Decimal(0),
    power: new Decimal(1)
  },
  miner: {
    bought: [new Decimal(0)],
    power: [new Decimal(1)],
    baseEff: [new Decimal(0.1)], // when you buy 1 Miner, the effect
    req: [new Decimal(50)] // first one is Miner 0, require cursor amount
  },
  dealed: new Decimal(0),
  lastTick: Date.now(),
  mainTab: 1,
  maxBulk: 1
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

function loop(unadjusted, off = 0) { //the begin of gameloop
  // update variables
  game.dealed = (game.dealed).add(getTotalMinerDamage().div(1000).times(unadjusted));
  game.depth = getDepth(game.dealed);
  game.coins = (game.coins).add(getCoinPerSecond().div(1000).times(unadjusted));
  game.cursor.power = getCursorPower()
  for (let i=0; i<1; i++) {
    game.miner.power[i] = getMinerPower(i)
  }
  // update display
  document.getElementById("coins").style.display = (game.depth.gte(1) ? "block" : "none")
  for (let i=0; i<1; i++) {
    document.getElementById("minerBought" + i).style.display = (game.cursor.amount.gte(game.miner.req[i]) ? "block" : "none")
    document.getElementById("maxMinerBought" + i).style.display = (game.cursor.amount.gte(game.miner.req[i]) ? "block" : "none")
  }
  document.getElementById("damagePerSecond").style.display = (getTotalMinerDamage().gt(0) ? "block" : "none")
  // update texts
  document.getElementById("depth").innerHTML = "Your depth is currently " + formate(game.depth,0) + " meter"
  document.getElementById("health").innerHTML = "Your health on this block is currently " + formate(getHealth(game.depth).sub(game.dealed),2) + "/" + formate(getHealth(game.depth).sub(getHealth(game.depth.sub(1))),2) + " (total dealed: " + formate(game.dealed,2) + ")"
  document.getElementById("coins").innerHTML = "You have " + formate(game.coins,2) + " coins (+" + formate(getCoinPerSecond(),2) + "/s)"
  document.getElementById("damage").innerHTML = "Deal Damage by " + formate(getCursorDamage(),2)
  document.getElementById("maxBulk").innerHTML = "Max Bulk buy: " + game.maxBulk
  document.getElementById("cursorAmount").innerHTML = (game.cursor.bought.gte(1000)?(game.cursor.bought.gte(10000)?"Superscaled ":"Scaled "):"") + "Cursor: " + formate(game.cursor.amount,0) + " (" + formate(game.cursor.bought,0) + " Bought)"
  document.getElementById("cursorPower").innerHTML = "Power: " + formate(game.cursor.power,2) + "x"
  document.getElementById("cursorCost").innerHTML = "Cost: " + formate(getCursorCost(game.cursor.bought),2)
  for (let i=0; i<1; i++) {
    document.getElementById("miner" + i + "Amount").innerHTML = (game.miner.bought[i].gte(1000)?(game.miner.bought[i].gte(10000)?"Superscaled ":"Scaled "):"") + "Miner " + i + ": " + formate(game.miner.bought[i],0)
    document.getElementById("miner" + i + "Power").innerHTML = "Power: "+ formate(game.miner.power[i],2) +"x"
    document.getElementById("miner" + i + "Cost").innerHTML = "Cost: " + formate(getMinerCost(i, game.miner.bought[i]),2)
  }
  document.getElementById("damagePerSecond").innerHTML = "You are dealing " + formate(getTotalMinerDamage(),2) + " per second"
} //the end of gameloop
