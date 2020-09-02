game = {
  depth: new Decimal(0),
  coins: new Decimal(0),
  cursor: {
    amount: [new Decimal(0)], // first one is x^0, second is derivative x^1, etc.
    bought: [new Decimal(0)],
    power: [new Decimal(1)],
  },
  clickCoolDown: 0, // millisecond
  miner: {
    bought: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
    power: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)],
    baseEff: [new Decimal(0.1),new Decimal(0),new Decimal(0),new Decimal(0)], // when you buy 1 Miner, the effect
    req: [new Decimal(50),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity)] // first one is Miner 0, require cursor amount
  },
  dealed: new Decimal(0),
  lastTick: Date.now(),
  mainTab: 1,
  // option
  maxBulk: 1000,
  notation: 0
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
  if (game.dealed.lt(0)) game.dealed = new Decimal(0)
  game.depth = getDepth(game.dealed);
  game.coins = (game.coins).add(getCoinPerSecond().div(1000).times(unadjusted));
  if (game.clickCoolDown > 0){
    game.clickCoolDown -= unadjusted
  };
  for (let i=0; i<1; i++) {
    game.cursor.power[i] = getCursorPower(i)
    game.miner.power[i] = getMinerPower(i)
  }
  // update display
  document.getElementById("coins").style.display = (game.depth.gte(1) ? "block" : "none")
  for (let i=0; i<1; i++) {
    document.getElementById("minerBought" + i).style.display = (game.cursor.amount[0].gte(game.miner.req[i]) ? "block" : "none")
    document.getElementById("maxMinerBought" + i).style.display = (game.cursor.amount[0].gte(game.miner.req[i]) ? "block" : "none")
  }
  document.getElementById("damagePerSecond").style.display = (getTotalMinerDamage().gt(0) ? "block" : "none")
  // update texts
  document.getElementById("depth").innerHTML = "Your depth is currently " + formate(game.depth,0) + " meter"
  document.getElementById("health").innerHTML = "Your health on this block is currently " + formate(getHealth(game.depth).sub(game.dealed),2) + "/" + formate(getHealth(game.depth).sub(getHealth(game.depth.sub(1))),2) + " (total dealed: " + formate(game.dealed,2) + ")"
  document.getElementById("coins").innerHTML = "You have " + formate(game.coins,2) + " coins (+" + formate(getCoinPerSecond(),2) + "/s)"
  document.getElementById("damage").innerHTML = "Deal Damage by " + formate(getCursorDamage(),2)
  document.getElementById("maxBulk").innerHTML = "Max Bulk buy: " + game.maxBulk
  for (let i=0; i<1; i++) {
    document.getElementById("cursor" + i + "Amount").innerHTML = (game.cursor.bought[i].gte(1000)?(game.cursor.bought[i].gte(10000)?"Superscaled ":"Scaled "):"") + "Cursor: " + formate(game.cursor.amount[i],0) + " (" + formate(game.cursor.bought[i],0) + " Bought)"
    document.getElementById("cursor" + i + "Power").innerHTML = "Power: " + formate(game.cursor.power[i],2) + "x"
    document.getElementById("cursor" + i + "Cost").innerHTML = "Cost: " + formate(getCursorCost(i, game.cursor.bought[i]),2)
  }
  for (let i=0; i<1; i++) {
    document.getElementById("miner" + i + "Amount").innerHTML = (game.miner.bought[i].gte(1000)?(game.miner.bought[i].gte(10000)?"Superscaled ":"Scaled "):"") + "Miner " + i + ": " + formate(game.miner.bought[i],0)
    document.getElementById("miner" + i + "Power").innerHTML = "Power: "+ formate(game.miner.power[i],2) +"x"
    document.getElementById("miner" + i + "Cost").innerHTML = "Cost: " + formate(getMinerCost(i, game.miner.bought[i]),2)
  }
  document.getElementById("damagePerSecond").innerHTML = "You are dealing " + formate(getTotalMinerDamage(),2) + " per second"
  document.getElementById("notation").innerHTML = "Notation: " + (game.notation == 0 ? "Scientific " : "Standard I" + (game.notation >= 2 ? (game.notation >= 3 ? "II " : "I ") : " ")) + "(Scientific Notation start at 1e" + (3 * 10 ** game.notation + 3) + ")"
} //the end of gameloop
