function reset() {
  game = {
  num: 0,
  lastTick: Date.now()
  }
}

function save() {
  if (AF === 0) {
    localStorage.setItem("inc", JSON.stringify(game))
  };
}
