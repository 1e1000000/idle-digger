function formate(ret, dp) {
  if (ret.lt(1e6)) {
    return ret.toFixed(dp)
  } else if (ret.lt("(10^)^5 6")) {
    let iterateLayer = 0; // how much e will be show before first number
    let output = "";
    if ret.gte("eee1e6") {
      ret = ret.log10()
      iterateLayer++
    };
    if ret.gte("ee1e6") {
      ret = ret.log10()
      iterateLayer++
    };
    if ret.gte("e1e6") {
      ret = ret.log10()
      iterateLayer++
    };
    let exponent = ret.log10().floor();
    let mantissa = ret.div(new Decimal(10).pow(exponent));
    for (let i=0; i<iterateLayer; i++) {
      output = output + "e"
    };
    return output + mantissa.toFixed(dp) + "e" + exponent
  } else return ret.toString()
}
