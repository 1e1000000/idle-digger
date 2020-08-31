function formate(ret, dp) {
  if (ret.lt(1e6)) {
    return ret.toFixed(dp)
  } else if (ret.lt("e1e6")) {
    return formateScientific(ret, 2)
  } else if (ret.lt("ee1e6")) {
    ret = ret.log10()
    return "e" + formateScientific(ret, 3)
  } else if (ret.lt("eee1e6")) {
    ret = ret.log10().log10()
    return "ee" + formateScientific(ret, 3)
  } else if (ret.lt("eeee1e6")) {
    ret = ret.log10().log10().log10()
    return "eee" + formateScientific(ret, 3)
  } else return ret.toString()
}

function formateScientific(ret, dp) {
  let exponent = ret.log10().floor();
  let mantissa = ret.div(new Decimal(10).pow(exponent));
  return mantissa.toFixed(dp) + "e" + exponent
}
