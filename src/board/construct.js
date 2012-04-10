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
    "use strict";

    var _           = require("underscore"),
        Piece       = require("piece/piece"),
        illegal     = require("board/illegal"),
        movement    = require("piece/movement");

    function Board() {
        this.pieces = [];
        this.captured = [];
        this.history = [];

        this.width = 10;
        this.height = 12;
    }

    Board.prototype = {

        getWidth: function () {
            return this.width;
        },

        getHeight: function () {
            return this.height;
        },

        // Fetch all pieces [ that match criteria ]
        all: function (iterator) {
            return _.compact(this.pieces, iterator || null);
        },

        // Fetch node by index
        fetch: function (index) {
            return this.pieces[index] || false;
        },

        // Create new piece and append to board
        create: function (type, color, index) {
            this.append(new Piece(type, color, index), index);
        },

        // Append piece to board
        append: function (piece, index) {
            this.pieces[index] = piece;
        },

        remove: function (index) {
            this.pieces[index] = undefined;
        },

        /*
            Move
            @param from int
            @param to int

            @return bool
        */
        move: function (from, to) {
            var piece,
                occupying,
                offsets,
                offsetsCaptures,
                iterations,
                valid,
                captures;

            piece = this.fetch(from);
            occupying = this.fetch(to);

            if (piece) {

                // Movement data
                offsets         = movement[piece.getType()].offsets;
                offsetsCaptures = movement[piece.getType()].captures;
                iterations      = movement[piece.getType()].distance;

                // Pawn - Forward movement hacks
                if (piece.getType() === "Pawn") {
                    offsets = _.filter(offsets, function (offset) {
                        if (piece.color == 'white') {
                            return offset < 0;
                        } else {
                            return offset > 0;
                        }
                    });

                    offsetsCaptures = _.filter(offsetsCaptures, function (offset) {
                        if (piece.color == 'white') {
                            return offset < 0;
                        } else {
                            return offset > 0;
                        }
                    });
                }

                // Collect legal moves and captures
                valid = this.legal(from, offsets, iterations);
                captures = this.legal(from, offsetsCaptures, iterations);

                // Pawn - Capture hacks
                if (piece.getType() === "Pawn") {
                    if (occupying) {
                        if (_.contains(captures, to)) {

                            this.remove(from);
                            piece.setPosition(to);
                            this.append(piece, to);

                            // Capture
                            this.capture();

                            return true;
                        } else {
                            return false;
                        }
                    }
                }

                if (_.contains(valid, to)) {

                    // Move + Capture
                    this.remove(from);
                    piece.setPosition(to);
                    this.append(piece, to);
                    return true;
                }
            }

            return false;
        },

        // Capture
        capture: function (index) {
            this.captured.push(this.fetch(index));
            this.remove(index);
        },

        /*
            Retrieve all legal moves
            @param index int
            @param offsets array
            @param distance int

            @return array
        */
        legal: function (index, offsets, iterations) {
            var current, distance,
                piece = this.fetch(index),
                valid = [];

            function enemy(found) {
                return piece.color !== found.color;
            }

            // Loop through each offset
            _.each(offsets, function (offset) {

                // Reset
                current = index + offset;
                distance = 0;

                // Repeat offset (Infinity or 1)
                while (distance < iterations) {
                    if (_.contains(illegal, current)) {

                        // Illegal (off board)
                        break;
                    } else if (this.isOccupied(current)) {

                        // Legal, enemy occupied
                        if (this.isOccupied(current, enemy)) {
                            valid.push(current);
                        }

                        break;
                    } else {

                        // Legal, unoccupied
                        valid.push(current);
                    }

                    // Step
                    current = current + offset;
                    distance += 1;
                }
            }, this);

            return valid;
        },

        /*
            Determines if a node is occupied by a piece
            @param index int
            @param color string

            @return bool
        */
        isOccupied: function (index, match) {
            var found = this.fetch(index);

            if (found) {
                if (typeof match === 'function') {
                    return match(found);
                }

                return true;
            } else {
                return false;
            }
        }

    };

    return Board;
});