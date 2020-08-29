function formate(ret, dp) {
  if (ret.lt(1e6)) {
    return ret.toFixed(dp)
  } else if (ret.lt("e1e6")) {
    let exponent = ret.log10().floor();
    let mantissa = ret.div(new Decimal(10).pow(exponent));
    return mantissa.toFixed(2) + "e" + exponent
  } else return ret.toString()
}
