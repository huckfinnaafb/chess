/*
    Representation
    10 x 12
    Single Dimensional Indexed Array

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
        _           = require("underscore"),
        config      = require("board/config"),
        illegal     = require("board/illegal"),
        pieces      = require("board/pieces"),
        movement    = require("piece/movement");

    // Board
    var Board = {
        init: function () {

        },

        getWidth: function () {
            return config.width;
        },

        getHeight: function () {
            return config.height;
        },

        all: function () {
            return _.compact(pieces);
        },

        add: function (type, color, index) {
            this.append(new Piece(type, color, index));
        },

        move: function (from, to) {

            // Contents of cell
            var piece = this.find(from),
                offsets = movement[piece.type].offsets,
                distance = movement[piece.type].distance;

            // Piece found
            if (piece) {
                var legal = this.legal(piece, offsets, distance);

                // Valid move
                if (_.contains(legal, to)) {

                    // Remove origin
                    this.remove(from);

                    // Remove destination (might contain enemy)
                    this.remove(to);

                    // Change position
                    piece.setPosition(to);

                    // Append back into the board
                    this.append(piece);

                    // Move successful
                    return true;
                }
            }

            // Move failed
            return false;
        },

        remove: function (index) {
            pieces[index] = undefined;
        },

        append: function (piece) {
            pieces[piece.position] = piece;
        },

        occupied: function (index, color) {
            var found = this.find(index);

            if (typeof found === 'undefined') {
                return false;
            } else if (typeof color === 'string') {
                if (color === found.color) {
                    return true;
                }

                return false;
            }

            return false;
        },

        find: function (index) {
            return pieces[index] || false;
        },

        legal: function (piece, offsets, distance) {
            var valid = [], current, i = 0;

            // Loop through each offset
            _.each(offsets, function (offset) {

                // Reset current
                current = piece.position + offset;

                // Repeat offset (Infinity or 1)
                while (i < distance) {

                    // Illegal
                    if (_.contains(illegal, current)) {
                        break;
                    }

                    // Occupied
                    else if (this.occupied(current)) {

                        // Enemy occupied
                        if (this.occupied(current, piece.enemy())) {
                            valid.push(current);
                        }

                        break;

                    // Unoccupied
                    } else {
                        valid.push(current);
                    }

                    // Increment offset pattern
                    current += offset;

                    // Distance iteration
                    i += 1;
                }
            }, this);

            return valid;
        }
    };

    // Initialize
    Board.init();

    return Board;
});