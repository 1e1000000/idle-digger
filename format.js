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
  let exponent = ret.log10().floor().toNumber();
  let mantissa = ret.div(new Decimal(10).pow(exponent)).toNumber();
  let standardPreE33 = ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No"]
  let standardUnits = ["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"]
  let standardTens = ["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"]
  let standardHundreds = ["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]
  if (ret.gte(new Decimal(10).pow(3 * 10 ** game.notation + 3))) {
    return mantissa.toFixed(dp) + "e" + exponent
  } else {
    let mod = exponent % 3
    exponent = (exponent - mod) / 3 - 1
    mantissa = mantissa * 10 ** mod
    if (ret.lt(new Decimal(1e33))) {
      return mantissa.toFixed(dp) + " " + standardPreE33[exponent]
    } else {
      return mantissa.toFixed(dp) + " " + standardUnits[exponent % 10] + standardTens[Math.floor(exponent / 10) % 10] + standardHundreds[Math.floor(exponent / 100)]
    }
  }
}

function toggleNotation() {
  game.notation = (game.notation + 1) % 4
}
