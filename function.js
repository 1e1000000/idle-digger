function getDepth(ret) { // ret: dealed
  if (ret.lt(1)) return new Decimal(0)
  return new Decimal(10).pow(ret.log10().sqrt()).floor().max(0)
}

function getHealth(ret) { // ret: depth
  if (ret.lt(0)) return 0
  return new Decimal(10).pow(ret.add(1).log10().pow(2))
}

function getCoinPerSecond() {
  let ret = new Decimal(2).pow(game.depth.root(3)).sub(1)
  if (game.cursor.amount[0].gte(249.999)) ret = ret.mul(10)
  if (game.factoryUpgrade[7].gte(0.5)) ret = ret.mul(getFactoryUpgEff(7))
  return ret
}

function toggleMaxBulk() {
  let ret = prompt("Please type in the new max bulk buy (Note: higher bulk buy will cost more performance), min: 1, max: 10000");
  if (!isFinite(ret)) ret = 1
  if (ret <= 1) ret = 1
  if (ret >= 10000) ret = 10000
  game.maxBulk = Math.round(ret)
}

function fib(term) { // fibonacci sequence
  let x = (1 + Math.sqrt(5)) / 2
  let y = -1 / x // (1-sqrt(5))/2
  return (x ** term - y ** term) / Math.sqrt(5)
}

function fibDecimal(term) { // fibonacci sequence, but with Decimal
  let x = new Decimal(1).add(new Decimal(5).sqrt()).div(2) // (1+sqrt(5))/2
  let y = new Decimal(-1).div(x) // (1-sqrt(5))/2
  return x.pow(term).sub(y.pow(term)).div(new Decimal(5).sqrt())
}

function getTotalMiners() {
  let ret = new Decimal(0)
  for (let i=0; i<4; i++) {
    ret = ret.add(game.miner.bought[i])
  }
  return ret
}

function getBoughtBoostMulti() {
  let ret = new Decimal(2)
  if (game.factoryUpgrade[8].gte(0.5)) ret = ret.add(getFactoryUpgEff(8))
  return ret
}

function isFactoryUnlocked() {
  if (game.cursor.amount[0].gte(299.999)) {
    return true
  } else return false
}

function getFactoryEnergyPerSecond() {
  let ret = new Decimal(0);
  if (isFactoryUnlocked()) {
    ret = new Decimal(1).add(game.miner.bought[2]).log10()
    ret = ret.pow(new Decimal(1).add(game.miner.bought[3]).log10().add(1))
    ret = ret.mul(getFactoryUpgEff(1))
    if (game.factoryUpgrade[6].gt(0.5)) ret = ret.mul(getFactoryUpgEff(6))
    ret = ret.div(100)
  }
  return ret
}

function getFactoryEnergyCap() {
  let ret = game.cursor.bought[0].div(100).mul(game.cursor.amount[0].div(3).log10())
  if (game.factoryUpgrade[4].gt(0.5) && ret.gte(1)) ret = ret.pow(2) // if base cap is below 1 will make the cap reduce
  if (game.factoryUpgrade[5].gt(0.5)) ret = ret.mul(new Decimal(10).add(game.coins).log10())
  ret = ret.mul(getFactoryUpgEff(3))
  return ret
}

function getFactoryEnergyEff() {
  let ret = new Decimal(1).add(game.factoryEnergy)
  ret = ret.pow(getFactoryUpgEff(2))
  return ret
}

function getMilestone7Eff() {
  if (game.cursor.amount[0].gte(399.999)) return new Decimal(10).add(game.cursor.bought[0]).log10()
  else return new Decimal(1)
}

function getMilestone2Eff() {
  if (game.cursor.amount[0].gte(99.999)) return getTotalMinerDamage().div(100).mul(getMilestone7Eff())
  else return new Decimal(0)
}

function getMilestone9Eff() {
  if (game.cursor.amount[0].gte(599.999)) return new Decimal(10).add(game.depth).log10().sqrt()
  else return new Decimal(1)
}

function getMilestone4Eff() {
  let ret = new Decimal(1)
  if (game.cursor.amount[0].gte(199.999)) ret = ret.add(getTotalMiners().div(100).mul(getMilestone9Eff()))
  if (game.cursor.amount[0].gte(599.999)) ret = ret.pow(2)
  return ret
}
