function getMinerInitialCost(generation) {
  return new Decimal(10).pow(fib(generation.add(4)))
}

function getMinerCost(generation,amount) { // generation: Miner #, amount: currently Miner # bought
  if (amount.lt(1000)) return getMinerInitialCost(generation).mul(new Decimal(1.09).pow(amount))
  if (amount.lt(10000)) return getMinerInitialCost(generation).mul(new Decimal(1.09).pow(amount.pow(2).div(1000)))
  return getMinerInitialCost(generation).mul(new Decimal(1.09).pow(amount.pow(amount.log10().sqrt()).div(1000)))
}
