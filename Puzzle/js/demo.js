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
    document.getElementById('replay').addEventListener("click", reset);
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
        puzzle.setAttribute("pos", i);
        if (i < 15) {
            puzzle.style.backgroundImage = "url(" + mapURL + ")";
        }
        map.appendChild(puzzle);
    }

    var puzzle = document.getElementsByTagName("li");
    for (var i = 0; i < 16; ++i) {
        puzzle[i].onclick = function(i) {
            const puzzlePos = [['0','0'],['25%','0'],['50%','0'],['75%', '0'],
                                ['0','25%'],['25%','25%'],['50%','25%'],['75%','25%'],
                                ['0','50%'],['25%','50%'],['50%','50%'],['75%','50%'],
                                ['0','75%'],['25%','75%'],['50%','75%'],['75%','75%']];

            function canGo(newx, newy) {
                if (newx < 0 || newx > 3 || newy < 0 || newy > 3) {
                    return false;
                } else {
                    return isEmpty[4*newx + newy];
                }
            }

            function move(nextx, nexty, old_pos, clickId) {

                // console.log("Ready to move")
                var new_pos = 4*nextx + nexty;
                // change the flag array isEmpty
                isEmpty[old_pos] = true;
                isEmpty[new_pos] = false;

                // change the exactly location

                var p = document.getElementsByTagName("li");
                for (var i = 0; i < 16; ++i) {
                    if (p[i].getAttribute("pos") == new_pos) {
                        p[i].setAttribute("pos", old_pos);
                        p[i].style.left=puzzlePos[old_pos][0];
                        p[i].style.top=puzzlePos[old_pos][1];
                        break;
                    }
                }

                document.getElementById(clickId).style.left=puzzlePos[new_pos][0];
                document.getElementById(clickId).style.top=puzzlePos[new_pos][1];
                document.getElementById(clickId).setAttribute("pos", new_pos);
            }

            return function() {
                var clickId = puzzle[i].id;
                var old_pos = parseInt(puzzle[i].getAttribute('pos'));
                var x = parseInt(old_pos/4);
                var y = old_pos % 4;

                if (canGo(x+1,y)) {
                    // go down
                    move(x+1,y,old_pos, clickId);
                }
                if (canGo(x-1,y)) {
                    // go up
                    move(x-1,y,old_pos, clickId);
                }
                if (canGo(x, y-1)) {
                    // go left
                    move(x, y-1,old_pos, clickId);
                }
                if (canGo(x, y+1)) {
                    // go right
                    move(x, y+1,old_pos, clickId);
                }
            }
        }(i);

    }
}

function reset() {
    makeGame();
}
