function formate(x, dp) {
  let output = ""
  let ret = x.abs()
  if (ret.lt(1e6)) {
    output = ret.toFixed(dp)
  } else if (ret.lt("e1e6")) {
    output = formateNum(ret, 2)
  } else if (ret.lt("ee1e6")) {
    ret = ret.log10()
    output = "e" + formateNum(ret, 3)
  } else if (ret.lt("eee1e6")) {
    ret = ret.log10().log10()
    output = "ee" + formateNum(ret, 3)
  } else if (ret.lt("eeee1e6")) {
    ret = ret.log10().log10().log10()
    output = "eee" + formateNum(ret, 3)
  } else if (ret.lt("eeeee1e6")) {
    ret = ret.log10().log10().log10().log10()
    output = "eeee" + formateNum(ret, 3)
  } else output = ret.toString()
  return (x.lt(0) ? "-" : "") + output
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

function formateTime(ret) {
  let y = new Decimal(31556926)
  let d = new Decimal(86400)
  let h = new Decimal(3600)
  let m = new Decimal(60)
  let s = new Decimal(1)
  if (ret.lt(m)) {
    return formate(ret,3) + "s"
  } else if (ret.lt(h)) {
    let modS = ret.sub(ret.div(m).floor().mul(m)) // seconds
    return formate(ret.div(m).floor()) + "m " + formate(modS,3) + "s"
  } else if (ret.lt(d)) {
    let modS = ret.sub(ret.div(m).floor().mul(m)) // seconds
    let modM = ret.sub(ret.div(h).floor().mul(h)) // minutes
    return formate(ret.div(h).floor()) + "h " + formate(modM.div(m).floor()) + "m " + formate(modS,3) + "s"
  } else if (ret.lt(y)) {
    let modS = ret.sub(ret.div(m).floor().mul(m)) // seconds
    let modM = ret.sub(ret.div(h).floor().mul(h)) // minutes
    let modH = ret.sub(ret.div(d).floor().mul(d)) // hours
    return formate(ret.div(d).floor()) + "d " + formate(modH.div(h).floor()) + "h " + formate(modM.div(m).floor()) + "m " + formate(modS,3) + "s"
  } else return formate(ret.div(y),3) + "y"
}
