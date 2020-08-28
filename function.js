function damage() {
  game.dealed = (game.dealed).add(0.01)
}

function getDepth(ret) {
  if ret.lt(1) return new Decimal(0)
  return new Decimal(10).pow(ret.log10().sqrt()).floor().max(0)
}
