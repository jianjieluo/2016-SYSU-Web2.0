var images = ["../images/panda.jpg", "../images/totoro.png"];
var count = 0;
var mapURL = images[0];
var isEmpty = new Array(15);

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
        if (i < 15) {
            puzzle.style.backgroundImage = "url(" + mapURL + ")";
        }

        puzzle.onclick = function(i) {
            const puzzlePos = [['0','0'],['25%','0'],['50%','0'],['75%', '0'],
                                ['25%','0'],['25%','25%'],['25%','50%'],['25%','75%'],
                                ['50%','0'],['50%','25%'],['50%','50%'],['50%','75%'],
                                ['75%','0'],['75%','25%'],['75%','50%'],['75%','75%']];
            var x = parseInt(i/4);
            var y = i % 4;

            function canGo(newx, newy) {
                if (newx < 0 || newx > 3 || newy < 0 || newy > 3) {
                    return false;
                } else {
                    return isEmpty[4*newx + newy];
                }
            }

            function move(nextx, nexty) {
                var index = 4*nextx + nexty;
                // change the flag array isEmpty
                isEmpty[i] = true;
                isEmpty[index] = false;

                // change the exactly location
                document.getElementById("img15").style.left = puzzlePos[i][0];
                document.getElementById("img15").style.top = puzzlePos[i][1];

                this.style.left = puzzlePos[index][0];
                this.style.top = puzzlePos[index][1];
            }

            return function() {
                if (canGo(x+1,y)) {
                    // go down
                    move(x+1,y);
                }
                if (canGo(x-1,y)) {
                    // go up
                    move(x-1,y);
                }
                if (canGo(x, y-1)) {
                    // go left
                    move(x, y-1);
                }
                if (canGo(x, y+1)) {
                    // go right
                    move(x, y+1);
                }
            }
        }

        map.appendChild(puzzle);
    }
}
