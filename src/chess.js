define(function (require) {
    var Board = require("board/board"),

        // Starting positions
        startingWhite = require("board/white"),
        startingBlack = require("board/black"),

        // Code <-> Index
        boardMap = require("board/map"),
        boardMapInv = require("board/map_invert");

    function toIndex(code) {
        return boardMapInv[code];
    }

    function toCode(index) {
        return boardMap[index];
    }

    var Chess = {
        turn    : "white",
        round   : 0,
        fps     : 10,
        step    : 1 / 10,
        frame   : 0,

        // Clear
        clear: function () {

        },

        // Fetch turn
        getTurn: function () {
            return this.turn;
        },

        // Fetch round
        getRound: function () {
            return this.round;
        },

        // Toggle turn
        toggle: function () {

        },

        // Move
        move: function (from, to) {
            var indexFrom = toIndex(from),
                indexTo = toIndex(to);

            var success = Board.move(indexFrom, indexTo);

            // Successful move
            if (success) {
                this.toggle();
                this.round += 1;
            }
        },

        // Save
        save: function () {

        },

        // Load
        load: function (state) {

        },

        // Reset
        reset: function () {
            this.round = 0;
            this.turn = "white";
        },

        // Configure
        config: function (options) {

        },

        setup: function (map, color) {
            var i;
            for (i in map) {
                Board.create(map[i], color, toIndex(i));
            }
        },

        // Begin new game
        begin: function () {
            this.reset();
            this.init();
        },

        // Update state
        update: function (dt) {
            this.frame += 1;
        }

    };

    // Initialize
    Chess.setup(startingWhite, "white");
    Chess.setup(startingBlack, "black");

    return Chess;
});