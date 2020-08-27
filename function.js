function damage() {
  game.dealed = (game.dealed).add(0.01)
}

function getDepth() {
  return new Decimal(10).pow(game.dealed.log10().sqrt()).floor().min(0)
}
