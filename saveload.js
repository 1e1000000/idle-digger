"use strict"
const saveLoc = "idle-digger"

function objectToDecimal(object) {
  for (let i in object) {
      if (typeof(object[i]) == "string" && new Decimal(object[i]) instanceof Decimal && !(new Decimal(object[i]).sign == 0 && object[i] != "0")) {
        object[i] = new Decimal(object[i]);
      }
      if (typeof(object[i]) == "object") {
          objectToDecimal(object[i]);
      }
  }
}

function merge(base, source) {
  for (let i in base) {
      if (source[i] != undefined) {
          if (typeof(base[i]) == "object" && typeof(source[i]) == "object" && !isDecimal(base[i]) && !isDecimal(source[i])) {
              merge(base[i], source[i]);
          } else {
              if (isDecimal(base[i]) && !isDecimal(source[i])) {
                  base[i] = new Decimal(source[i]);
              } else if (!isDecimal(base[i]) && isDecimal(source[i])) {
                  base[i] = source[i].toNumber();
              } else {
                  base[i] = source[i];
              }
          }
      }
  }
}


function isDecimal(x) {
	if (x == undefined) return false
  if (x.array != undefined && x.plus != undefined) {
      return true;
  } else {
      return false;
  }
}

var savegame;

function save() {
  localStorage.setItem(saveLoc, JSON.stringify(game));
}

function load() {
  if (localStorage.getItem(saveLoc)) {
    savegame = JSON.parse(localStorage.getItem(saveLoc));
    objectToDecimal(savegame);
    merge(game, savegame);
  }
}

function wipeSave() {
  reset()
  save()
  location.reload()
}

function exportSave() {
  return btoa(JSON.stringify(game));
}

function importSave(text) {
  savegame = JSON.parse(atob(text));
  objectToDecimal(savegame);
  merge(game, savegame);
  save();
}

function reset() {
  game = {
    depth: new Decimal(0),
    coins: new Decimal(0),
    cursor: new Decimal(0),
    dealed: new Decimal(0),
    lastTick: Date.now(),
    mainTab: 1
  }
}
