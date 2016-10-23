var images = ["../images/panda.jpg", "../images/totoro.png"];
var count = 0;
var mapURL = images[0];

const puzzlePos = [['0','0'],['25%','0'],['50%','0'],['75%', '0'],
                    ['25%','0'],['25%','25%'],['25%','50%'],['25%','75%'],
                    ['50%','0'],['50%','25%'],['50%','50%'],['50%','75%'],
                    ['75%','0'],['75%','25%'],['75%','50%'],['75%','75%']];

window.onload = function() {
    document.getElementById("nextPage").addEventListener("click", function() {
        mapURL = images[(++count) % images.length];
        makeGame();
    });
    makeGame();
    // document.getElementById('replay').addEventListener("click", reset);
}

function makeGame() {

    var map = document.getElementById("map");
    while (map.firstChild) {
        map.removeChild(map.firstChild);
    }
    for (var i = 0; i < 15; ++i) {
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
