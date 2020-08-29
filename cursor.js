function getCursorCost(amount) { // amount: currently cursor
  if (amount.lt(10)) return new Decimal(10).add(amount)
  return new Decimal(20).mul(new Decimal(1.05).pow(amount.sub(10)))
}

function buyCursor() {
  if (game.coins.gte(getCursorCost(game.cursor.bought)))) {
    game.coins = game.coins.sub(getCursorCost(game.cursor.bought))
    game.cursor.amount = game.cursor.amount.add(1)
    game.cursor.bought = game.cursor.bought.add(1)
  }
}

function getCursorDamage() {
  return game.cursor.amount.add(1).div(100)
}
