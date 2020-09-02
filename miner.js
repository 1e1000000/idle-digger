function getMinerInitialCost(generation) {
  return new Decimal(10).pow(fib(new Decimal(generation).add(4)))
}

function getMinerCost(generation,amount) { // generation: Miner #, amount: currently Miner # bought
  if (amount.lt(1000)) return getMinerInitialCost(generation).mul(new Decimal(1.09).pow(amount))
  if (amount.lt(10000)) return getMinerInitialCost(generation).mul(new Decimal(1.09).pow(amount.pow(2).div(1000)))
  return getMinerInitialCost(generation).mul(new Decimal(1.09).pow(amount.pow(amount.log10().sqrt()).div(1000)))
}

function buyMiner(generation) {
  if (game.coins.gte(getMinerCost(generation, game.miner.bought[generation]))) {
    game.coins = game.coins.sub(getMinerCost(generation, game.miner.bought[0]))
    game.miner.bought[generation] = game.miner.bought[generation].add(1)
  }
}

function buyMultipleMiner(generation, amount) { //amount: bulk
  let i = new Decimal(0)
  while (game.coins.gte(getMinerCost(generation, game.miner.bought[generation])) && i.lt(amount)) {
    buyMiner(generation)
    i = i.add(1)
  }
}

function buyMaxMiner(generation) {
  let i = new Decimal(0)
  while (game.coins.gte(getMinerCost(generation, game.miner.bought[generation])) && i.lt(10000)) {  // hardcap at 10k to prevent performance issue
    buyCursor()
    i = i.add(1)
  }
}

function maxMiner(generation) {
  buyMultipleMiner(generation, new Decimal(game.maxBulk))
}

function getTotalMinerDamage() {
  let ret = new Decimal(0)
  for (let i=0; i<1; i++) {
    ret = ret.add(game.miner.bought[i].mul(game.miner.baseEff[i]).mul(getMinerPower(i)))
  }
  return ret
}

function getMinerPower(generation) {
  return new Decimal(2).pow(game.miner.bought[generation].div(25).floor())
}

function getNextMinerReq() {
  let ret = game.miner.req[0];
  for (let i=0; i<3; i++) {
    if (game.cursor.amount[0].gte(game.miner.req[i])) {
      ret = game.miner.req[i+1];
    };
  };
  return ret
}
