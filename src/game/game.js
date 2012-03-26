define(function (require) {

    var white = require("data/setup_white"),
        black = require("data/setup_black"),
        Board = require("game/board");

    function Game() {
        this.fps = 25;
        this.step = 1 / 25;
        this.paused = false;
        this.turn = 0;
        this.round = 0;

        // Setup board & pieces
        this.board = new Board();
        this.board.setup(white, "white");
        this.board.setup(black, "black");
    }

    Game.prototype.update = function (dt) {

    };

    return Game;
});