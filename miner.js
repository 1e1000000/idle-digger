function getMinerInitialCost(generation) {
  return new Decimal(10).pow(fib(new Decimal(generation).add(4)))
}

function getMinerCost(generation,amount) { // generation: Miner #, amount: currently Miner # bought
  if (amount.lt(1000)) return getMinerInitialCost(generation).mul(new Decimal(1.09).pow(amount))
  if (amount.lt(10000)) return getMinerInitialCost(generation).mul(new Decimal(1.09).pow(amount.pow(2).div(1000)))
  if (amount.lt(100000)) return getMinerInitialCost(generation).mul(new Decimal(1.09).pow(amount.pow(amount.log10().sqrt()).div(1000)))
  let ret = getMinerInitialCost(generation).mul(new Decimal(1.09).pow(amount.pow(amount.log10().sqrt()).div(1000))).log10()
  return new Decimal(10).pow(ret.pow(amount.div(100000)))
}

function buyMiner(generation) {
  if (game.coins.gte(getMinerCost(generation, game.miner.bought[generation]))) {
    game.coins = game.coins.sub(getMinerCost(generation, game.miner.bought[generation]))
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
    buyMiner(generation)
    i = i.add(1)
  }
}

function maxMiner(generation) {
  buyMultipleMiner(generation, new Decimal(game.maxBulk))
}

function getMinerGlobalDamageMulti() {
  let ret = new Decimal(1)
  ret = ret.mul(getMilestone4Eff());
  if (isFactoryUnlocked()) ret = ret.mul(getFactoryEnergyEff());
  ret = ret.div(getDamageDivider())
  return ret
}

function getTotalMinerDamage() {
  let ret = new Decimal(0)
  for (let i=0; i<4; i++) {
    ret = ret.add(game.miner.bought[i].mul(minerBaseEff[i]).mul(getMinerPower(i)))
  };
  ret = ret.mul(getMinerGlobalDamageMulti());
  return ret
}

function getMinerPower(generation) {
  let ret = getBoughtBoostMulti().pow(game.miner.bought[generation].add(0.001).div(25).floor());
  return ret
}
