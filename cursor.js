function getCursorInitialCost(generation) {
  if (generation == 0) return new Decimal(10);
  return new Decimal(10000).pow(fib(new Decimal(generation).add(5)))
}

function getCursorCostScaling(generation) {
  if (generation == 0) return new Decimal(1.05)
  return new Decimal(1).add(new Decimal(generation).div(10))
}

function getCursorCost(generation,amount) { // amount: currently cursor
  if (amount.lt(1000)) return getCursorInitialCost(generation).mul(getCursorCostScaling(generation).pow(amount))
  if (amount.lt(10000)) return getCursorInitialCost(generation).mul(getCursorCostScaling(generation).pow(amount.pow(2).div(1000)))
  if (amount.lt(100000)) return getCursorInitialCost(generation).mul(getCursorCostScaling(generation).pow(amount.pow(amount.log10().sqrt()).div(1000)))
  let ret = getCursorInitialCost(generation).mul(getCursorCostScaling(generation).pow(amount.pow(amount.log10().sqrt()).div(1000))).log10()
  return new Decimal(10).pow(ret.pow(amount.div(100000)))
}

function getMaxCursorBought(generation) {
  let i = new Decimal(0)
  let totalCost = new Decimal(0)
  while (game.coins.sub(totalCost).gte(getCursorCost(game.cursor.bought[generation].add(i)))) {
    totalCost = totalCost.add(getCursorCost(game.cursor.bought[generation].add(i)))
    i = i.add(1)
  }
  if (i.gte(10000)) return new Decimal(10000) // hardcap at 10k to prevent performance issue
  return i
}

function buyCursor(generation) {
  if (game.coins.gte(getCursorCost(generation, game.cursor.bought[generation]))) {
    game.coins = game.coins.sub(getCursorCost(generation, game.cursor.bought[generation]))
    game.cursor.amount[generation] = game.cursor.amount[generation].add(1)
    game.cursor.bought[generation] = game.cursor.bought[generation].add(1)
  }
}

function buyMultipleCursor(generation,amount) { //amount: bulk
  let i = new Decimal(0)
  while (game.coins.gte(getCursorCost(generation, game.cursor.bought[generation])) && i.lt(amount)) {
    buyCursor(generation)
    i = i.add(1)
  }
}

function buyMaxCursor(generation) {
  let i = new Decimal(0)
  while (game.coins.gte(getCursorCost(game.cursor.bought[generation])) && i.lt(10000)) {  // hardcap at 10k to prevent performance issue
    buyCursor(generation)
    i = i.add(1)
  }
}

function maxCursor(generation) {
  buyMultipleCursor(generation,new Decimal(game.maxBulk))
}

function getCursorDamage() {
  let ret = game.cursor.amount[0].mul(getCursorPower(0)).add(1).div(100)
  if (game.cursor.amount[0].gte(99.999)) ret = ret.add(getTotalMinerDamage().div(100).mul(getMilestone7Eff()))
  return ret
}

function damage() {
  if (game.clickCoolDown <= 0) {
    game.dealed = (game.dealed).add(getCursorDamage())
    game.clickCoolDown = 80
  }
}

function getCursorPower(generation) {
  if (generation == 0) return getBoughtBoostMulti().pow(game.cursor.bought[generation].add(0.001).div(50).floor())
  return new Decimal(1).add(getBoughtBoostMulti().div(10)).pow(game.cursor.bought[generation].add(0.001).div(50).floor())
}
