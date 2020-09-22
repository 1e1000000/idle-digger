function updateVariable(ms) { // always update
  game.totalPlayed += ms
  let gameSpeed = 1
  game.dealed = (game.dealed).add(getTotalMinerDamage().times(ms).div(1000));
  if (game.dealed.lt(0)) game.dealed = new Decimal(0)
  game.depth = getDepth(game.dealed);
  if (game.bestDepth.lte(game.depth)) game.bestDepth = game.depth;
  game.coins = (game.coins).add(getCoinPerSecond().times(ms).div(1000));
  game.totalCoins = (game.totalCoins).add(getCoinPerSecond().times(ms).div(1000));
  if (game.coins.lt(0)) game.coins = new Decimal(0)
  if (game.clickCoolDown > 0) game.clickCoolDown -= ms;
  game.factoryEnergy = (game.factoryEnergy).add(getFactoryEnergyPerSecond().times(ms).div(1000));
  if (game.factoryEnergy.gt(getFactoryEnergyCap())) game.factoryEnergy = getFactoryEnergyCap();
  for (let i=0; i<10; i++) { // There are no x^11 derivatite
    game.cursor.amount[i] = game.cursor.amount[i].add(game.cursor.amount[i+1].times(ms).div(1000))
  }
}

function updateMain() { // always update
  document.getElementById("coins").style.display = (game.depth.gte(0.999) ? "block" : "none")
  document.getElementById("damagePerSecond").style.display = (getTotalMinerDamage().gt(0) ? "block" : "none")
  document.getElementById("damageDivider").style.display = (game.depth.gte(49999.999) ? "block" : "none")
  document.getElementById("subtab1_2").style.display = (game.cursor.amount[0].gte(49.999) ? "inline-block" : "none")
  document.getElementById("subtab1_3").style.display = (game.cursor.amount[0].gte(299.999) ? "inline-block" : "none")
  document.getElementById("tab5").style.display = (game.factoryUpgrade[9].gte(0.999) ? "inline-block" : "none")
  // space between display and text
  document.getElementById("depth").innerHTML = "Your " + (game.depth.gte(49999.999) ? "Scaled " : "") + "Depth is currently " + formate(game.depth,0) + " meters"
  document.getElementById("health").innerHTML = "Your health on this block is currently " + formate(getHealth(game.depth).sub(game.dealed),2) + "/" + formate(getHealth(game.depth).sub(getHealth(game.depth.sub(1))),2)
  document.getElementById("coins").innerHTML = "You have " + formate(game.coins,2) + " coins (+" + formate(getCoinPerSecond(),2) + "/s)"
  document.getElementById("damage").innerHTML = "Deal Damage by " + formate(getCursorDamage(),2)
  document.getElementById("damagePerSecond").innerHTML = "You are dealing " + formate(getTotalMinerDamage(),2) + " per second"
  document.getElementById("damageDivider").innerHTML = "Because you have digged very far, your damage has divided by " + formate(getDamageDivider())
}

function updateCursorTab() { // update if you are in cursor tab (main: 1, sub: 1)
  document.getElementById("maxBulk").innerHTML = "Max Bulk buy: " + game.maxBulk
  for (let i=0; i<11; i++) {
    document.getElementById("cursorBought" + i).style.display = (game.depth.gte(cursorReq[i]) ? "block" : "none")
    document.getElementById("maxCursorBought" + i).style.display = (game.depth.gte(cursorReq[i]) ? "block" : "none")
    // space between display and text
    document.getElementById("cursor" + i + "Amount").innerHTML = (game.cursor.bought[i].gte(999.999) ? (game.cursor.bought[i].gte(9999.999) ? (game.cursor.bought[i].gte(99999.999) ? "Hyper " : "Superscaled ") : "Scaled ") : "") + cursorName[i] + "Cursor: " + formate(game.cursor.amount[i],0) + " (" + formate(game.cursor.bought[i],0) + " Bought)"
    document.getElementById("cursor" + i + "Power").innerHTML = "Power: " + formate(getCursorPower(i),2) + "x"
    document.getElementById("cursor" + i + "Cost").innerHTML = "Cost: " + formate(getCursorCost(i, game.cursor.bought[i]),2)
  }
}

function updateMinerTab() { // update if you are in miner tab (main: 1, sub: 2)
  document.getElementById("maxBulk").innerHTML = "Max Bulk buy: " + game.maxBulk
  document.getElementById("nextMinerReq").innerHTML = (game.cursor.amount[0].lt(499.999) ? "Get " + formate(
    game.cursor.amount[0].lt(49.999) ? new Decimal(50) : 
    (game.cursor.amount[0].lt(149.999) ? new Decimal(150) : 
    (game.cursor.amount[0].lt(249.999) ? new Decimal(250) : new Decimal(500)))) + 
    " Cursors to Unlock new Miner" : "You have unlocked all Miners!")
  for (let i=0; i<10; i++) {
    document.getElementById("minerBought" + i).style.display = (game.cursor.amount[0].gte(minerReq[i]) ? "block" : "none")
    document.getElementById("maxMinerBought" + i).style.display = (game.cursor.amount[0].gte(minerReq[i]) ? "block" : "none")
    // space between display and text
    document.getElementById("miner" + i + "Amount").innerHTML = (game.miner.bought[i].gte(999.999) ? (game.miner.bought[i].gte(9999.999) ? (game.miner.bought[i].gte(99999.999) ? "Hyper " : "Superscaled ") : "Scaled ") : "") + "Miner " + i + ": " + formate(game.miner.bought[i],0)
    document.getElementById("miner" + i + "Power").innerHTML = "Power: "+ formate(getMinerPower(i),2) +"x"
    document.getElementById("miner" + i + "Cost").innerHTML = "Cost: " + formate(getMinerCost(i, game.miner.bought[i]),2)
  }
}

function updateFactoryTab() { // update if you are in factory tab (main: 1, sub: 3)
  document.getElementById("maxBulk").innerHTML = "Max Bulk buy: " + game.maxBulk
  document.getElementById("factoryUpgrade2").style.display = (game.factoryUpgrade[1].gte(2.999) ? "inline-block" : "none")
  document.getElementById("factoryUpgrade4").style.display = (game.factoryUpgrade[2].gte(0.999) ? "inline-block" : "none")
  document.getElementById("factoryUpgrade5").style.display = (game.factoryUpgrade[2].gte(0.999) ? "inline-block" : "none")
  document.getElementById("factoryUpgrade7").style.display = (game.factoryUpgrade[2].gte(3.999) && game.factoryUpgrade[5].gte(0.999) ? "inline-block" : "none")
  document.getElementById("factoryUpgrade8").style.display = (game.factoryUpgrade[2].gte(3.999) && game.factoryUpgrade[5].gte(0.999) ? "inline-block" : "none")
  document.getElementById("factoryUpgrade3").style.display = (game.factoryUpgrade[8].gte(0.999) ? "inline-block" : "none")
  document.getElementById("factoryUpgrade6").style.display = (game.factoryUpgrade[8].gte(0.999) ? "inline-block" : "none")
  document.getElementById("factoryUpgrade9").style.display = (game.factoryUpgrade[8].gte(0.999) ? "inline-block" : "none")
  // space between display and text
  document.getElementById("factoryEnergy").innerHTML = "You have " + formate(game.factoryEnergy, 3) + " Factory Energy, Multiplying all Miner damage by " + formate(getFactoryEnergyEff(), 3)
  document.getElementById("factoryEnergyPerSecond").innerHTML = "You are getting " + formate(getFactoryEnergyPerSecond(), 3) + " Factory Energy per second (based on Miners),"
  document.getElementById("factoryEnergyCap").innerHTML = "but will be capped at " + formate(getFactoryEnergyCap(), 3) + " Factory Energy (based on Cursors)"
  for (let i=1; i<10; i++) {
    if (i < 8.5) document.getElementById("factoryUpg" + i + "Eff").innerHTML = formate(getFactoryUpgEff(i), 2) + ((i == 2 && getFactoryUpgEff(i).gt(2)) ? " (softcapped)" : "")
    if (i > 3.5) {
      document.getElementById("factoryUpg" + i + "Level").innerHTML = (game.factoryUpgrade[i].gte(0.5) ? "Purchased" : "Not Purchased")
      document.getElementById("factoryUpg" + i + "Cost").innerHTML = "Cost: " + formate(factoryUpgradeInitCost[i], 3)
    } else {
    document.getElementById("factoryUpg" + i + "Level").innerHTML = (game.factoryUpgrade[i].gte(100) ? "Scaled " : "") + "Level " + formate(game.factoryUpgrade[i])
    document.getElementById("factoryUpg" + i + "Cost").innerHTML = "Cost: " + formate(getFactoryUpgradeCost(i,game.factoryUpgrade[i]), 3)
    }
  }
}

function updateMilestoneTab() { // update if you are in milestone tab (main: 2)
  for (let i=1; i<11; i++) {
    document.getElementById("milestone" + i + "achieve").innerHTML = (game.cursor.amount[0].gte(milestoneReq[i]) ? "(Achieved) " : "(" + formate(game.cursor.amount[0].div(milestoneReq[i]).mul(100), 2) + "% done) " )
  }
  document.getElementById("milestone2effect").innerHTML = formate(getMilestone2Eff(), 2)
  document.getElementById("milestone4effect").innerHTML = formate(getMilestone4Eff(), 2)
  document.getElementById("milestone7effect").innerHTML = formate(getMilestone7Eff(), 2)
  document.getElementById("milestone9effect").innerHTML = formate(getMilestone9Eff(), 2)
}

function updateOptionTab() { // update if you are in option tab (main: 3)
  document.getElementById("notation").innerHTML = "Notation: " + (game.notation == 0 ? "Scientific " : "Standard I" + (game.notation >= 2 ? (game.notation >= 3 ? "II " : "I ") : " ")) + "(Scientific Notation start at 1e" + (3 * 10 ** game.notation + 3) + ")"
}

function updateStatisticTab() { // update if you are in statictic tab (main: 4)
  document.getElementById("statistic1").innerHTML = "You have played for " + formateTime(new Decimal(game.totalPlayed/1000))
  document.getElementById("statistic2").innerHTML = "You have gained " + formate(game.totalCoins,2) + " coins"
  document.getElementById("statistic3").innerHTML = "You have bought " + formate(getTotalMiners()) + " miners"
  document.getElementById("statistic4").innerHTML = "You have dealed " + formate(game.dealed,2) + " damage"
  document.getElementById("statistic5").innerHTML = "Your best depth was " + formate(game.bestDepth) + " meters"
}
