define(function (require) {
    var Board = require("board/board"),

        // Starting positions
        startingWhite = require("board/white"),
        startingBlack = require("board/black"),

        // Code -> Index
        boardMap = require("board/map"),

        // Index -> Code
        boardMapInv = require("board/map_invert");

    function toIndex(code) {
        return boardMapInv[code];
    }

    function toCode(index) {
        return boardMap[index];
    }

    var Chess = {
        fps: 10,
        frame: 0,
        step: 1 / 10,
        turn: "white",
        board: Board,

        init: function () {
            this.setup(startingWhite, "white");
            this.setup(startingBlack, "black");
        },

        update: function (dt) {
            this.frame += 1;
        },

        move: function (from, to) {
            var indexFrom = toIndex(from),
                indexTo = toIndex(to);

            var piece = this.board.find(indexFrom);

            // Selected any piece at all
            if (typeof piece !== 'undefined') {

                // Selected piece belongs to current team
                if (piece.color === this.turn) {

                    // Move returns true or false if move was successful
                    var success = this.board.move(indexFrom, indexTo);

                    if (success) {

                        // Next player's turn
                        this.toggle();
                    }
                }
            }
        },

        setup: function (map, color) {
            var code;
            for (code in map) {
                this.board.add(map[code], color, toIndex(code));
            }
        },

        toggle: function () {
            if (this.turn == 'white') {
                this.turn = 'black';
            } else {
                this.turn = 'white';
            }
        }
    };

    // Initialize
    Chess.init();

    return Chess;
});