function damage() {
  game.dealed = (game.dealed).add(0.01)
}

function getDepth(ret) { // ret: dealed
  if (ret.lt(1)) return new Decimal(0)
  return new Decimal(10).pow(ret.log10().sqrt()).floor().max(0)
}

function getHealth(ret) { // ret: depth
  if (ret.lt(0)) return 0
  return new Decimal(10).pow(ret.add(1).log10().pow(2))
}

function getCoinPerSecond() {
  return new Decimal(2).pow(game.depth.root(3)).sub(1)
}
