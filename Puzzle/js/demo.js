var images = ["../images/panda.jpg", "../images/totoro.png"];
var count = 0;
var mapURL = images[0];
var isEmpty[16];

window.onload = function() {
    document.getElementById("nextPage").addEventListener("click", function() {
        mapURL = images[(++count) % images.length];
        makeGame();
    });
    makeGame();
    // document.getElementById('replay').addEventListener("click", reset);
}

function makeGame() {
    for (var i = 0; i < 15; ++i) {
        isEmpty[i] = false;
    }
    isEmpty[15] = true;

    var map = document.getElementById("map");
    while (map.firstChild) {
        map.removeChild(map.firstChild);
    }
    for (var i = 0; i < 16; ++i) {
        var puzzle = document.createElement("li");
        puzzle.setAttribute("id", ("img" + i));
        puzzle.style.backgroundImage = "url(" + mapURL + ")";

        puzzle.onclick = function(i) {
            return move() {

            }
        }

        map.appendChild(puzzle);
    }
}
