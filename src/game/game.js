define(function (require) {

    var Board  = require("game/board"),
        Camera = require("render/camera"),
        loop = require("game/loop"),

        white  = require("data/setup_white"),
        black  = require("data/setup_black");

    function Game() {
        this.fps = undefined;
        this.step = 1 / 25;
        this.board = undefined;
    }

    // Update game state
    Game.prototype.update = function (dt) {

    };

    // Game configuration
    Game.prototype.config = function (options) {
        var i;
        for (i in options) {
            if (this.hasOwnProperty(i)) {
                this[i] = options[i];
            }
        }
    };

    // Initialize the game
    Game.prototype.init = function () {

        // Setup board
        this.board = new Board();
        this.board.setup(white, "white");
        this.board.setup(black, "black");

        // Setup camera
        this.camera = new Camera("chess", this);

        loop(this, this.camera);
    };

    // Reset the game state
    Game.prototype.reset = function () {

    };

    // Preload assets
    Game.prototype.preload = function () {

    };

    // Start game
    Game.prototype.play = function () {

    };

    return Game;
});