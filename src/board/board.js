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

        // Fetch height
        height: function () {
            return config.height;
        },

        // Fetch width
        width: function () {
            return config.width;
        },

        // Fetch all pieces [ that match criteria ]
        all: function (iterator) {
            return _.compact(pieces, iterator || null);
        },

        // Fetch node by index
        fetch: function (index) {
            return pieces[index] || false;
        },


        // Create new piece and append to board
        create: function (type, color, index) {
            this.append(new Piece(type, color, index), index);
        },

        // Append piece to board
        append: function (piece, index) {
            pieces[index] = piece;
        },

        remove: function (index) {
            pieces[index] = undefined;
        },

        // Move
        move: function (from, to) {
            var piece = this.fetch(from);

            // Piece found
            if (piece) {
                var offsets     = movement[piece.type].offsets,
                    distance    = movement[piece.type].distance,
                    legal = this.legal(piece.position, offsets, distance);

                // Valid move
                if (_.contains(legal, to)) {
                    this.remove(from);
                    this.remove(to);
                    piece.setPosition(to);
                    this.append(piece, to);

                    return true;
                }
            }

            // Move failed
            return false;
        },

        // Capture
        capture: function () {

        },

        /*
            Retrieve all legal moves
                @return array
                @param index int
                @param offsets array
                @param distance int
        */
        legal: function (index, offsets, iterations) {
            var current, distance,
                piece = this.fetch(index),
                valid = [];

            // Loop through each offset
            _.each(offsets, function (offset) {

                // Reset
                current = index + offset;
                distance = 0;

                // Repeat offset (Infinity or 1)
                while (distance < iterations) {

                    // Illegal
                    if (_.contains(illegal, current)) {
                        break;
                    }

                    // Occupied
                    else if (this.isOccupied(current)) {
                        if (piece) {

                            // Enemy occupied
                            if (this.isOccupied(current, piece.enemy())) {
                                valid.push(current);
                            }
                        }

                        break;

                    // Unoccupied
                    } else {
                        valid.push(current);
                    }

                    // Increment offset pattern
                    current = current + offset;

                    // Increment distance
                    distance += 1;
                }
            }, this);

            return valid;
        },

        /*
            Determines if a node is occupied by a piece
                @return bool
                @param index int
                @param color string
        */
        isOccupied: function (index, color) {
            var match = this.fetch(index);

            if (match) {
                if (color) {
                    if (match.color === color) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    };

    return Board;
});