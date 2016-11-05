var gameInfo = {
    maps: ['../images/panda.jpg', '../images/totoro.png', '../images/sen.png'],
    mapsIndex: 0,
    isEmpty: new Array(15),
    isRunning: false,
    puzzlePos: [
        ['0', '0'],
        ['25%', '0'],
        ['50%', '0'],
        ['75%', '0'],
        ['0', '25%'],
        ['25%', '25%'],
        ['50%', '25%'],
        ['75%', '25%'],
        ['0', '50%'],
        ['25%', '50%'],
        ['50%', '50%'],
        ['75%', '50%'],
        ['0', '75%'],
        ['25%', '75%'],
        ['50%', '75%'],
        ['75%', '75%']
    ]
};

(function() {

    $(function() {
        new Pane();
    });

    var Pane = function() {
        this.createPuzzles();
        this.listenThePuzzles();
        this.listenTheButtons();
        this.showMap();
    };


    var Puzzle = function(i) {
        this.id = 'img' + i;
        this.pos = gameInfo.puzzlePos[i];
    };

    var p = Pane.prototype;

    p.createPuzzles = function() {
        this.puzzles = [];
        for (var i = 0; i < 15; ++i) {
            this.puzzles.push(new Puzzle(i));
        }
    };

    p.listenThePuzzles = function() {
        $('#map').click(function(event) {
            var puzzle = event.target;
            if (puzzle.canMove()) puzzle.move();
        }.bind(this));
    };

    p.listenTheButtons = function() {
        $('#replay').click(function(event) {
            p.shufflePos();
        }.bind(this));

        $('#nextPage').click(function(event) {
            p.cleanMap();
            gameInfo.mapURL = gameInfo.maps[++mapsIndex];
            p.createPuzzles();
        }.bind(this));

        $('#refresh').click(function() {
            p.cleanMap();
            p.createPuzzles();
        })
    };

    p.showMap = function() {
        var mapURL = gameInfo.maps[gameInfo.mapsIndex];
        for (var i = 0; i < 15; ++i) {
            var dom = '<li id=\'' + this.puzzles[i].id + '\'></li>';
            $('#map').append(dom);
            $('#' + this.puzzles[i].id).css('background-image', "url(" + mapURL + ")");
        }
    };


    // p.showMap();


}())
