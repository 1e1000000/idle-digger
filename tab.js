function Tab(t) {
  game.mainTab = t;
  document.getElementById("Tab1").style.display = "none";
  document.getElementById("Tab2").style.display = "none";
  document.getElementById("Tab3").style.display = "none";
  document.getElementById("Tab4").style.display = "none";
  document.getElementById("Tab5").style.display = "none";
  document.getElementById("Tab" + game.mainTab).style.display = "block";
}
