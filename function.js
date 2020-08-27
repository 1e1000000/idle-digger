function damage() {
  game.dealed = (game.dealed).add(0.01)
}

function getDepth() {
  let base = new Decimal(10).pow((game.dealed).log10().add(1)).floor().min(0)
  if !isFinite(base) return 0
  return base
}
