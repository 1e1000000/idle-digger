function reset() {
  game = {
  depth: new Decimal(0),
  coins: new Decimal(0),
  cursor: new Decimal(0),
  dealed: new Decimal(0),
  lastTick: Date.now()
  }
}

function save() {
    localStorage.setItem("inc", JSON.stringify(game))
}

function load() {
  const loadgame = JSON.parse(localStorage.getItem("inc"));
  if (loadgame !== null) {
    loadGame(loadgame);
  }
}

function loadGame(loadgame) {
  reset();
  for (const i in loadgame) {
    game[i] = loadgame[i];
  }
  const diff = Date.now() - game.lastTick
}
