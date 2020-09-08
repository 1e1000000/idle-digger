function getFactoryUpgradeCost(id,amount) {
  if (amount.lt(100)) return factoryUpgradeInitCost[id].mul(factoryUpgradeCostScaling[id].pow(amount))
  else return factoryUpgradeInitCost[id].mul(factoryUpgradeCostScaling[id].pow(amount.pow(2).div(100)))
}

function buyFactoryUpgrade(id) {
  if (game.factoryEnergy.gte(getFactoryUpgradeCost(id, game.factoryUpgrade[id]))) {
    game.factoryEnergy = game.factoryEnergy.sub(getFactoryUpgradeCost(id, game.factoryUpgrade[id]))
    game.miner.bought[id] = game.miner.bought[id].add(1)
  }
}
