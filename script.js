game = {
  num: new Decimal(0),
  lastTick: Date.now()
}

let deltaTime;
const calculate = window.setInterval(() => {
  deltaTime = Date.now() - game.lastTick;
  loop(deltaTime);
  game.lastTick = Date.now()
}, 0);

function loop(unadjusted, off = 0) {
  game.num = (game.num).add(unadjusted/1000)
  document.getElementById("number").innerHTML = "Your number is currently " + new Decimal(2).pow((game.num).pow(2)).toPrecision(4)
}

function inc() {
  game.num = (game.num).add(1)
}
