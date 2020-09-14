function Tab(t) {
  game.mainTab = t;
  document.getElementById("Tab1").style.display = "none";
  document.getElementById("Tab2").style.display = "none";
  document.getElementById("Tab3").style.display = "none";
  document.getElementById("Tab4").style.display = "none";
  document.getElementById("Tab5").style.display = "none";
  document.getElementById("Tab" + game.mainTab).style.display = "block";
}

function subTab1(t) {
  game.subTab1 = t;
  document.getElementById("subTab1_1").style.display = "none";
  document.getElementById("subTab1_2").style.display = "none";
  document.getElementById("subTab1_3").style.display = "none";
  document.getElementById("subTab1_" + game.subTab1).style.display = "block";
}
