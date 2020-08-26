game = {
  num: 0,
  lastTick: 0
}

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.lastTick;
  game.lastTick = Date.now();
  loop(deltaTime)
}, game.msint);

function loop(unadjusted, off = 0) {
  game.num += unadjusted/1000
  document.getElementById("number").innerHTML = "Your number is currently " + game.num
}

function inc() {
  game.num++
}
