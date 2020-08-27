function damage() {
  game.dealed = (game.dealed).add(0.01)
}

function getDepth() {
  return new Decimal(10).pow((game.dealed).log10().add(1)).floor().min(0)
}
