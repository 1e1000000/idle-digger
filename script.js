game = {
  depth: new Decimal(0),
  bestDepth: new Decimal(0),
  coins: new Decimal(0),
  totalCoins: new Decimal(0),
  cursor: {
    amount: [new Decimal(0)], // first one is x^0, second is derivative x^1, etc.
    bought: [new Decimal(0)],
  },
  clickCoolDown: 0, // millisecond
  miner: {
    bought: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
  },
  dealed: new Decimal(0),
  lastTick: Date.now(),
  totalPlayed: 0, // millisecond
  mainTab: 1,
  // option
  maxBulk: 1000,
  notation: 0,
  version: 0,
};
load();
Tab(game.mainTab)

const minerBaseEff = [new Decimal(0.1),new Decimal(2),new Decimal(56),new Decimal(0)]; // when you buy 1 Miner, the effect
const minerReq = [new Decimal(49.999),new Decimal(149.999),new Decimal(249.999),new Decimal(1.79769313486231e308)] // first one is Miner 0, require cursor amount
const milestoneReq = [null,new Decimal(49.999),new Decimal(99.999),new Decimal(149.999),new Decimal(199.999),new Decimal(249.999),new Decimal(299.999),new Decimal(Infinity)] // require cursor

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
  game.totalPlayed += unadjusted
  game.dealed = (game.dealed).add(getTotalMinerDamage().div(1000).times(unadjusted));
  if (game.dealed.lt(0)) game.dealed = new Decimal(0)
  game.depth = getDepth(game.dealed);
  if (game.bestDepth.gte(game.depth)) game.bestDepth = game.depth;
  game.coins = (game.coins).add(getCoinPerSecond().div(1000).times(unadjusted));
  game.totalCoins = (game.totalCoins).add(getCoinPerSecond().div(1000).times(unadjusted));
  if (game.coins.lt(0)) game.coins = new Decimal(0)
  if (game.clickCoolDown > 0){
    game.clickCoolDown -= unadjusted
  };
  // update display
  document.getElementById("coins").style.display = (game.depth.gte(1) ? "block" : "none")
  for (let i=0; i<4; i++) {
    document.getElementById("minerBought" + i).style.display = (game.cursor.amount[0].gte(minerReq[i]) ? "block" : "none")
    document.getElementById("maxMinerBought" + i).style.display = (game.cursor.amount[0].gte(minerReq[i]) ? "block" : "none")
  }
  document.getElementById("tab2").style.display = (game.cursor.amount[0].gte(49.999) ? "inline-block" : "none")
  document.getElementById("tab3").style.display = (game.cursor.amount[0].gte(299.999) ? "inline-block" : "none")
  // update texts
  document.getElementById("depth").innerHTML = "Your depth is currently " + formate(game.depth,0) + " meter"
  document.getElementById("health").innerHTML = "Your health on this block is currently " + formate(getHealth(game.depth).sub(game.dealed),2) + "/" + formate(getHealth(game.depth).sub(getHealth(game.depth.sub(1))),2)
  document.getElementById("coins").innerHTML = "You have " + formate(game.coins,2) + " coins (+" + formate(getCoinPerSecond(),2) + "/s)"
  document.getElementById("damage").innerHTML = "Deal Damage by " + formate(getCursorDamage(),2)
  document.getElementById("damagePerSecond").innerHTML = "You are dealing " + formate(getTotalMinerDamage(),2) + " per second"
  document.getElementById("maxBulk").innerHTML = "Max Bulk buy: " + game.maxBulk
  for (let i=0; i<1; i++) {
    document.getElementById("cursor" + i + "Amount").innerHTML = (game.cursor.bought[i].gte(1000) ? (game.cursor.bought[i].gte(10000) ? (game.cursor.bought[i].gte(100000) ? "Hyper " : "Superscaled ") : "Scaled ") : "") + "Cursor: " + formate(game.cursor.amount[i],0) + " (" + formate(game.cursor.bought[i],0) + " Bought)"
    document.getElementById("cursor" + i + "Power").innerHTML = "Power: " + formate(getCursorPower(i),2) + "x"
    document.getElementById("cursor" + i + "Cost").innerHTML = "Cost: " + formate(getCursorCost(i, game.cursor.bought[i]),2)
  }
  for (let i=0; i<4; i++) {
    document.getElementById("miner" + i + "Amount").innerHTML = (game.miner.bought[i].gte(1000) ? (game.miner.bought[i].gte(10000) ? (game.miner.bought[i].gte(100000) ? "Hyper " : "Superscaled ") : "Scaled ") : "") + "Miner " + i + ": " + formate(game.miner.bought[i],0)
    document.getElementById("miner" + i + "Power").innerHTML = "Power: "+ formate(getMinerPower(i),2) +"x"
    document.getElementById("miner" + i + "Cost").innerHTML = "Cost: " + formate(getMinerCost(i, game.miner.bought[i]),2)
  }
  document.getElementById("notation").innerHTML = "Notation: " + (game.notation == 0 ? "Scientific " : "Standard I" + (game.notation >= 2 ? (game.notation >= 3 ? "II " : "I ") : " ")) + "(Scientific Notation start at 1e" + (3 * 10 ** game.notation + 3) + ")"
  document.getElementById("nextMinerReq").innerHTML = "Get " + formate(
    game.cursor.amount[0].lt(49.999) ? new Decimal(50) : 
    (game.cursor.amount[0].lt(149.999) ? new Decimal(150) : 
    (game.cursor.amount[0].lt(249.999) ? new Decimal(250) : new Decimal(1.79769313486231e308)))) + 
    " Cursors to Unlock new Miner"
  document.getElementById("damagePerSecond").style.display = (getTotalMinerDamage().gt(0) ? "block" : "none")
    for (let i=1; i<7; i++) {
    document.getElementById("milestone" + i + "achieve").innerHTML = (game.cursor.amount[0].gte(milestoneReq[i]) ? "(Achieved) " : "")
  }
  document.getElementById("milestone2effect").innerHTML = formate((game.cursor.amount[0].gte(99.999) ? getTotalMinerDamage().div(100) : new Decimal(0)), 2)
  document.getElementById("milestone4effect").innerHTML = formate(game.cursor.amount[0].gte(199.999) ? getTotalMiners() : new Decimal(0))
  document.getElementById("statistic1").innerHTML = "You have played for " + formateTime(new Decimal(game.totalPlayed/1000))
  document.getElementById("statistic2").innerHTML = "You have gained " + formate(game.totalCoins,2) + " coins"
  document.getElementById("statistic3").innerHTML = "You have bought " + formate(getTotalMiners()) + " miners"
  document.getElementById("statistic4").innerHTML = "You have dealed " + formate(game.dealed,2) + " damage"
  document.getElementById("statistic5").innerHTML = "Your best depth was " + formate(game.depth) + " meter"
} //the end of gameloop
