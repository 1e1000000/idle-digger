game = {
  depth: new Decimal(0),
  bestDepth: new Decimal(0),
  coins: new Decimal(0),
  totalCoins: new Decimal(0),
  cursor: {
    amount: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)], // first one is x^0, second is x^1, etc.
    bought: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
  },
  clickCoolDown: 0, // millisecond
  miner: {
    bought: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
  },
  dealed: new Decimal(0),
  factoryEnergy: new Decimal(0),
  factoryUpgrade: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  lastTick: Date.now(),
  totalPlayed: 0, // millisecond
  mainTab: 1,
  subTab1: 1,
  // option
  maxBulk: 1000,
  notation: 0,
  version: 0,
};
load();
Tab(game.mainTab);
subTab1(game.subTab1)

const cursorName = ["", "Velocity ", "Acceleration ", "Jerk ", "Snap ", "Crackle ", "Pop ", "Lock ", "Drop ", "Shot ", "Put "]
const cursorReq = [new Decimal(-1),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity)] // first one is x^0 Cursor, require your depth, non-x^0 also require a reset
const minerBaseEff = [new Decimal(0.1),new Decimal(2),new Decimal(56),new Decimal(11000),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)]; // when you buy 1 Miner, the effect
const minerReq = [new Decimal(49.999),new Decimal(149.999),new Decimal(249.999),new Decimal(499.999),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity)] // first one is Miner 0, require cursor amount
const milestoneReq = [null,new Decimal(49.999),new Decimal(99.999),new Decimal(149.999),new Decimal(199.999),new Decimal(249.999),new Decimal(299.999),new Decimal(399.999),new Decimal(499.999),new Decimal(599.999),new Decimal(699.999)] // require cursor
const factoryUpgradeInitCost = [null,new Decimal(1),new Decimal(6),new Decimal(2000),new Decimal(6.4),new Decimal(45),new Decimal(9000),new Decimal(640),new Decimal(1800),new Decimal(60000)]
const factoryUpgradeCostScaling = [null,new Decimal(2),new Decimal(4),new Decimal(8),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity),new Decimal(Infinity)] // Infinity mean you can only buy this upgrade once

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.lastTick;
  if (deltaTime > 600000) {
    for (let i=0; i<1000; i++) {
      loop(deltaTime/1000)
    }
  } else loop(deltaTime)
  game.lastTick = Date.now()
}, 20);

var autoSave = window.setInterval(function() {
  save()
}, 10000)

function loop(unadjusted, off = 0) { //the begin of gameloop
  let ms = unadjusted
  updateVariable(ms)
  updateMain()
  if (game.mainTab == 1) {
    if (game.subTab1 == 1) updateCursorTab()
    if (game.subTab1 == 2) updateMinerTab()
    if (game.subTab1 == 3) updateFactoryTab()
  }
  if (game.mainTab == 2) updateMilestoneTab()
  if (game.mainTab == 3) updateOptionTab()
  if (game.mainTab == 4) updateStatisticTab()
}
