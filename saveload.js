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

function reset() {
  game = {
    depth: new Decimal(0),
    coins: new Decimal(0),
    cursor: {
      amount: [new Decimal(0)], // first one is x^0, second is derivative x^1, etc.
      bought: [new Decimal(0)],
      power: [new Decimal(1)],
    },
    clickCoolDown: 0, // millisecond
    miner: {
      bought: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0)],
      power: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1)],
      baseEff: [new Decimal(0.1),new Decimal(0),new Decimal(0),new Decimal(0)], // when you buy 1 Miner, the effect
      req: [new Decimal(50),new Decimal(150),new Decimal(0),new Decimal(0)] // first one is Miner 0, require cursor amount
    },
    dealed: new Decimal(0),
    lastTick: Date.now(),
    mainTab: 1,
    // option
    maxBulk: 1000,
    notation: 0
  };
}
