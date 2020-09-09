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
    return new Decimal(1.1).pow(factoryUpgrade[id])
  } else if (id == 2) {
    return new Decimal(1).add(factoryUpgrade[id]).sqrt()
  } else return false
}
