game = {
  num: 0,
  lastTick: Date.now()
}

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.lastTick;
  loop(deltaTime);
  game.lastTick = Date.now()
}, game.msint);

function loop(unadjusted, off = 0) {
  game.num += unadjusted/1000
  document.getElementById("number").innerHTML = "Your number is currently " + (game.num).toFixed(3)
}

function inc() {
  game.num++
}
