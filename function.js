function damage() {
  game.dealed = (game.dealed).add(0.01)
}

function getDepth() {
  let base = new Decimal(10).pow(game.dealed.log10().sqrt()).floor().max(0)
  if !isFinite(base) {
    return new Decimal(0)
  }
  return base
}
