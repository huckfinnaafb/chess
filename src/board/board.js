/*
    Representation (10 x 12 Single Dimensional Indexed Array)

    # # # # # # # # # #   # : illegal
    # # # # # # # # # #   - : open
    # r n b q k b n r #
    # p p p p p p p p #   r : rook
    # - - - - - - - - #   n : knight
    # - - - - - - - - #   b : bishop
    # - - - - - - - - #   q : queen
    # - - - - - - - - #   k : king
    # p p p p p p p p #   p : pawn
    # r n b q k b n r #
    # # # # # # # # # #
    # # # # # # # # # #
*/
define(function (require) {
    var Piece       = require("piece/piece"),
        map         = require("board/map"),
        map_invert  = require("board/map_invert"),
        illegal     = require("board/illegal"),
        initWhite   = require("data/white"),
        initBlack   = require("data/black"),
        movement    = require("piece/movement");

    // Board representation
    var pieces = new Array(120);

    // Helpers
    function toCode(index) {
        return map[index];
    }

    function toIndex(code) {
        return map_invert[code];
    }

    // Board
    var Board = {
        width: 10,
        height: 12,

        init: function () {
            this.setup(initWhite, "white");
            this.setup(initBlack, "black");
        },

        setup: function (map, color) {
            var i;
            for (i in map) {
                this.add(map[i], color, i);
            }
        },

        all: function () {
            return pieces;
        },

        add: function (type, color, code) {
            this.append(new Piece(
                type,
                color,
                toIndex(code)
            ), toIndex(code));
        },

        append: function (piece, index) {
            pieces[index] = piece;
        },

        find: function (index) {
            return pieces[index];
        },

        legal: function (piece) {
            var offsets     = movement[piece.type].offsets,
                distance    = movement[piece.type].distance,
                origin      = piece.position,
                threatens   = [],
                potential   = [],
                current, i, j;

            // Loop through each offsets
            for (i = 0; i < offsets.length; i += 1) {

                // Reset current pointer
                current = origin + offsets[i];

                // Repeat offset (Infinity or 1)
                for (j = 0; j < distance; j += 1) {
                    var found = this.find(current);

                    // Is illegal move
                    if (_.include(illegal, current)) {
                        break;
                    }

                    // Enemy index
                    if (typeof found !== 'undefined') {
                        if (found.color == piece.enemy()) {
                            threatens.push(current);
                        }
                    }

                    // Empty index
                    if (typeof found === 'undefined') {

                    }

                }
            }
        }
    };

    // Initialize
    Board.init();

    return Board;
});