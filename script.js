game = {
  num: 0,
  lastTick: 0
}

let deltaTime;
const calculate = window.setInterval(() => {
  game.lastTick = Date.now();
  loop(deltaTime);
  deltaTime = Date.now() - game.lastTick
}, game.msint);

function loop(unadjusted, off = 0) {
  game.num += unadjusted/1000
  document.getElementById("number").innerHTML = "Your number is currently " + game.num
}

function inc() {
  game.num++
}
