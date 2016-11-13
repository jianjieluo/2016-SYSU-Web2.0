var gameInfo = {
    isGaming: false,
    countDown: '',
};

(function() {

    // window.onload = function() {
    //     new gamePane();
    // };
    $(function() {
        new gamePane();
    });

    var gamePane = function() {
        this.createMoles();
        this.addMoles();
        this.resetTime();
        this.resetScore();
        this.listenHolesClick();
        this.listenButtonClick();
    }

    var mole = function(i) {
        this.index = i;
        this.canBeat = false;
    }

    var p = gamePane.prototype;

    p.createMoles = function() {
        this.moles = [];
        for (var i = 0; i < 60; ++i) {
            this.moles.push(new mole(i));
        }
    }

    p.addMoles = function() {
        var map = $("#map");
        for (var i = 0; i < 60; ++i) {
            map.append("<div id=\"" + i + "\"></div>");
        }
    }

    p.resetTime = function() {
        this.time = 30;
    }
    p.resetScore = function() {
        this.score = 0;
    }

    p.listenButtonClick = function() {
        $("#button").click(function() {
            gameInfo.isGaming = !gameInfo.isGaming;
            if (gameInfo.isGaming) {
                $("#state").html("Playing");
                this.running();
            } else {
                $("#state").html("Pause");
                this.pausing();
            }
        }.bind(this));
    }

    p.running = function() {
        gameInfo.countDown = setInterval(function() {
            if (this.time > 0) {
                --this.time;
                $("#time").html(this.time + '');
            } else {
                clearInterval(gameInfo.countDown);
                alert("Game Over: Your score is:" + this.score);
                gameInfo.isGaming = false;
            }
        }.bind(this), 1000);
        this.appearMouse();
    }

    p.pausing = function() {
        clearInterval(gameInfo.countDown);
    }

    p.listenHolesClick = function() {
        $("#map").click(function(event) {
            if (gameInfo.isGaming) {
                var clickedMole = this.moles[event.target.id];
                if (clickedMole.canBeat) {
                    $("#score").html(++this.score);
                    clickedMole.canBeat = false;
                    $("#map > div[id=\"" + clickedMole.index + "\"]").css("background-color", "white");
                    this.appearMouse();
                } else {
                    $("#score").html(--this.score);
                }
            }
        }.bind(this));
    };

    p.appearMouse = function() {
        var findIfHaveMouse = _.find(this.moles, function(item) {
            return item.canBeat == true;
        });

        if (findIfHaveMouse == undefined) {
            var randomIndex = _.random(0, 59);
            this.moles[randomIndex].canBeat = true;
            $("#map > div:eq(" + randomIndex + ")").css("background-color", "lightblue");
        }
    }
})()
