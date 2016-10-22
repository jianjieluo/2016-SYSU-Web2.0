var isGaming = false;
var haveMole = false;
var time = 0;
var x = '';
var s = 0;
window.onload = function() {
    var map = document.getElementById('map');
    for (var i = 0; i < 60; ++i) {
        var node = document.createElement("DIV");
        map.appendChild(node);
    }
    document.getElementById('button').addEventListener('click', changeState)
    nodes = document.getElementById('map').childNodes;
}


function changeState() {
    var state = document.getElementById('state');
    isGaming = !isGaming;
    if (isGaming) {
        state.innerHTML = 'Playing';
        if (time == 0) {
            time = 30;
        }
        running();
    } else {
        state.innerHTML = 'Stop';
        stop();
    }
    // if (isGaming) {
    //     running();
    // } else {
    //     stop();
    // }
}

function running() {
    x = setInterval(doLoop, 1000);
    if (!haveMole) {
        randomB = Math.floor(Math.random() * 60);
        nodes[randomB].style.backgroundColor = "lightblue";
        haveMole = true;
    }

    for (var index = 0; index < nodes.length; index++) {
        nodes[index].setAttribute('index', index);
        nodes[index].addEventListener("click", function() {
            if (isGaming) {
                if (this.getAttribute('index') == randomB) {
                    document.getElementById('score').innerHTML = ++s;
                    nodes[randomB].style.backgroundColor = "white";
                    randomB = Math.floor(Math.random() * 60);
                    nodes[randomB].style.backgroundColor = "lightblue";
                    // break;
                } else {
                    document.getElementById('score').innerHTML = --s;
                }
            }
        });
    }

}



function doLoop() {
    if (time > 0) {
        --time;
        document.getElementById('time').innerHTML = time;
    } else {
        clearInterval(x);
        alert("Game Over: Your socore is:" + document.getElementById('score').innerHTML)
        isGaming = false;
        haveMole = false;
    }
}

function stop() {
    clearInterval(x);
}
