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
  };
  if (game.version<=0) {
    // blank
  }
}

function resetConf() {
  let x = confirm("Are you sure you want to delete all of your progress? You can't undo this process!")
  if (x) wipeSave()
}

function wipeSave() {
  reset()
  save()
  location.reload()
}

function exportSave() {
  copyStringToClipboard(btoa(JSON.stringify(game)))
}

function copyStringToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-99999px"
  };
  document.body.appendChild(el);
  copyToClipboard(el);
  document.body.removeChild(el);
}

function copyToClipboard(el) {
  el = typeof el === "string" ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  } else {
    el.select();
  }
  document.execCommand("copy");
}

function importSave(text) {
  savegame = JSON.parse(atob(prompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE")));
  objectToDecimal(savegame);
  merge(game, savegame);
  save();
}

function reset() { // now value
game = {
  depth: new Decimal(0),
  bestDepth: new Decimal(0),
  coins: new Decimal(0),
  totalCoins: new Decimal(0),
  cursor: {
    amount: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)], // first one is x^0, second is x^1, etc.
    bought: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
  },
  clickCoolDown: 0, // millisecond
  miner: {
    bought: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
  },
  dealed: new Decimal(0),
  factoryEnergy: new Decimal(0),
  factoryUpgrade: [null, new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
  lastTick: Date.now(),
  totalPlayed: 0, // millisecond
  mainTab: 1,
  subTab1: 1,
  // option
  maxBulk: 1000,
  notation: 0,
  version: 0,
};
}
