function Tab(t) {
  document.getElementById("Tab1").style.display = "none";
  document.getElementById("Tab2").style.display = "none";
  document.getElementById("Tab3").style.display = "none";
  document.getElementById("Tab" + t).style.display = "block";
}
