var gameInfo = {
    maps: ['../images/panda.jpg', '../images/totoro.png', '../images/sen.png'],
    mapsIndex: 0,
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
        this.addPuzzles();
        this.listenPuzzlesClick();
        this.listenButtonsClick();
    };


    var Puzzle = function(i) {
        this.id = 'img' + i;
        this.posIndex = i;
        this.pos = gameInfo.puzzlePos[this.posIndex];
    };

    var p = Pane.prototype;

    p.createPuzzles = function() {
        this.emptyPosIndex = 15;
        this.puzzles = [];
        for (var i = 0; i < 15; ++i) {
            this.puzzles.push(new Puzzle(i));
        }
    };

    p.addPuzzles = function() {
        var mapURL = gameInfo.maps[gameInfo.mapsIndex];
        for (var i = 0; i < 16; ++i) {
            if (i == this.emptyPosIndex) continue;
            var dom = '<li id=\'' + this.puzzles[i].id + '\'></li>';
            $('#map').append(dom);
            $('#' + this.puzzles[i].id).css('background-image', "url(" + mapURL + ")");
        }
    };

    p.listenPuzzlesClick = function() {
        // there has a question.....
        $('#map').click(function(event) {
            var puzzle = this.puzzles[parseInt(event.target.id.slice(3))];
            if (puzzle != undefined) {
                if (puzzle.canMove(this.emptyPosIndex)) puzzle.move(this);
            }
        }.bind(this));
    };

    var puzzle_pro = Puzzle.prototype;

    puzzle_pro.canMove = function(emptyPosIndex) {
        var canMoveHorizontal = (Math.abs(this.posIndex - emptyPosIndex) == 1);
        var canMoveVertical = (Math.abs(this.posIndex - emptyPosIndex) == 4);
        return canMoveHorizontal ^ canMoveVertical;
    }

    puzzle_pro.move = function(pane) {
        var temp = pane.emptyPosIndex;
        pane.emptyPosIndex = this.posIndex;
        this.posIndex = temp;
        this.pos = gameInfo.puzzlePos[this.posIndex];
        // console.log(pane.emptyPosIndex);
        this.updateLocation();
    }

    puzzle_pro.updateLocation = function() {
        $('#' + this.id).css('left', this.pos[0]);
        $('#' + this.id).css('top', this.pos[1]);
    }

    p.listenButtonsClick = function() {
        var buttons = $('button');

        // replay button
        buttons[0].click(function(event) {
            p.shufflePos();
        }.bind(this));

        // nextPage button
        buttons[1].click(function(event) {
            p.cleanMap();
            gameInfo.mapURL = gameInfo.maps[++mapsIndex];
            p.createPuzzles();
        }.bind(this));

        // refresh button
        buttons[2].click(function() {
            p.cleanMap();
            p.createPuzzles();
        })
    };




}())
