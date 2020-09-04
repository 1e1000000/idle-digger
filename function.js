function getDepth(ret) { // ret: dealed
  if (ret.lt(1)) return new Decimal(0)
  return new Decimal(10).pow(ret.log10().sqrt()).floor().max(0)
}

function getHealth(ret) { // ret: depth
  if (ret.lt(0)) return 0
  return new Decimal(10).pow(ret.add(1).log10().pow(2))
}

function getCoinPerSecond() {
  let ret = new Decimal(2).pow(game.depth.root(3)).sub(1)
  if (game.cursor.amount[0].gte(199.999)) ret = ret.mul(10)
  return ret
}

function toggleMaxBulk() {
  let ret = prompt("Please type in the new max bulk buy (Note: higher bulk buy will cost more performance), min: 1, max: 10000");
  if (ret <= 1) ret = 1
  if (ret >= 10000) ret = 10000
  game.maxBulk = Math.round(ret)
}

function fib(term) { // fibonacci sequence
  let x = (1 + Math.sqrt(5)) / 2
  let y = -1 / x // (1-sqrt(5))/2
  return (x ** term - y ** term) / Math.sqrt(5)
}

function fibDecimal(term) { // fibonacci sequence, but with Decimal
  let x = new Decimal(1).add(new Decimal(5).sqrt()).div(2) // (1+sqrt(5))/2
  let y = new Decimal(-1).div(x) // (1-sqrt(5))/2
  return x.pow(term).sub(y.pow(term)).div(new Decimal(5).sqrt())
}
