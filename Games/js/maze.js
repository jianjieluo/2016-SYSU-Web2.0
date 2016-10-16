var isGaming = false;
var isCheating = false;
const cheatInfo = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!"
const winInfo = "You Win"
const loseInfo = "You Lose"

window.onload = function() {
    var nodes = document.getElementsByClassName("node");
    nodes[0].addEventListener('mouseover', gameStart);
    nodes[1].addEventListener("mouseover", gameEnd);
    var walls = document.getElementsByClassName("wall");
    for (var i = 0; i < walls.length; ++i) {
        walls[i].addEventListener("mouseover", function() {
            if (isGaming) {
                this.style.backgroundColor = "red";
                document.getElementById('maze-positioner').style.cursor = "auto";
                document.getElementById('result').innerHTML = loseInfo;
                isGaming = false;

            }
        });
        // walls[i].onmouseover.style.backgroundColor = "red";
    }
    document.getElementById("maze-positioner").addEventListener("mouseleave", outMaze);
}

function gameStart() {
    isGaming = true;
    isCheating = false;
    document.getElementById("result").innerHTML = "";
    document.getElementById("maze-positioner").style.cursor = "pointer";
    var walls = document.getElementsByClassName("wall");
    for (var i = 0; i < walls.length; ++i) {
        walls[i].style.backgroundColor = '#EEEEEE';
    }
}

function gameEnd() {
    if (isGaming) {
        if (isCheating) {
            document.getElementById("maze-positioner").style.cursor = "pointer";
            document.getElementById('result').innerHTML = cheatInfo;
            isCheating = false;
        } else {
            document.getElementById('maze-positioner').style.cursor = "auto";
            document.getElementById('result').innerHTML = winInfo;
        }
    }
    isGaming = false;
}

// function gameOver(wall) {
// if (isGaming) {
//     wall.style.backgroundColor = "red";
//     document.getElementById('maze-positioner').style.cursor = "auto";
//     document.getElementById('result').innerHTML = loseInfo;
//     isGaming = false;
// }
// }

function outMaze() {
    if (isGaming) {
        isCheating = true;
    }
}
