function getFactoryUpgradeCost(id,amount) {
  if (amount.lt(100)) return factoryUpgradeInitCost[id].mul(factoryUpgradeCostScaling[id].pow(amount))
  else return factoryUpgradeInitCost[id].mul(factoryUpgradeCostScaling[id].pow(amount.pow(2).div(100)))
}

function buyFactoryUpgrade(id) {
  if (game.factoryEnergy.gte(getFactoryUpgradeCost(id, game.factoryUpgrade[id]))) {
    game.factoryEnergy = game.factoryEnergy.sub(getFactoryUpgradeCost(id, game.factoryUpgrade[id]))
    game.factoryUpgrade[id] = game.factoryUpgrade[id].add(1)
  }
}

function getFactoryUpgEff(id) {
  if (id == 1) {
    return new Decimal(1.1).pow(game.factoryUpgrade[id])
  } else if (id == 2) {
    let ret = new Decimal(1).add(game.factoryUpgrade[id]).root(3)
    if (ret.gte(2)) ret = ret.mul(2).sqrt()
    return ret
  } else if (id == 3) {
    return new Decimal(10).add(game.depth).log10().pow(game.factoryUpgrade[id].sqrt())
  } else if (id == 4) {
    return game.cursor.bought[0].div(100).mul(game.cursor.amount[0].div(3).log10())
  } else if (id == 5) {
    return new Decimal(10).add(game.coins).log10()
  } else if (id == 6) {
    return new Decimal(2).add(game.bestDepth).log2()
  } else if (id == 7) {
    return new Decimal(1).add(game.factoryEnergy).sqrt()
  } else if (id == 8) {
    return new Decimal(1)
  } else return new Decimal(0)
}
