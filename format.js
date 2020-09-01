function formate(ret, dp) {
  if (ret.lt(1e6)) {
    return ret.toFixed(dp)
  } else if (ret.lt("e1e6")) {
    return formateNum(ret, 2)
  } else if (ret.lt("ee1e6")) {
    ret = ret.log10()
    return "e" + formateNum(ret, 3)
  } else if (ret.lt("eee1e6")) {
    ret = ret.log10().log10()
    return "ee" + formateNum(ret, 3)
  } else if (ret.lt("eeee1e6")) {
    ret = ret.log10().log10().log10()
    return "eee" + formateNum(ret, 3)
  } else if (ret.lt("eeeee1e6")) {
    ret = ret.log10().log10().log10().log10()
    return "eeee" + formateNum(ret, 3)
  } else return ret.toString()
}

function formateNum(ret, dp) {
  let exponent = ret.log10().floor();
  let mantissa = ret.div(new Decimal(10).pow(exponent));
  return mantissa.toFixed(dp) + "e" + exponent
}

function toggleNotation() {
  game.notation = (game.notation + 1) % 4
}
