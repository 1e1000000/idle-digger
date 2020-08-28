function getCursorCost(amount) { // amount: currently cursors
  if (amount.lt(10)) return new Decimal(10).add(amount)
  return new Decimal(20).mul(new Decimal(1.05).pow(amount.sub(10)))
}
