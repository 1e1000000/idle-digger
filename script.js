game = {
  lastTick: 0,
  num: 0
}

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.lastTick;
  loop(deltaTime);
  game.lastTick = Date.now()
}, game.msint);

function loop(unadjusted, off = 0) {
  game.num += unadjusted/1000
  document.getElementById("number").innerHTML = "Your number is currently " + game.num
}

function inc() {
  game.num++
}
