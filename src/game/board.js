/*
    r k b k q b k r
    p p p p p p p p
    x x x x x x x x
    x x x x x x x x
    x x x x x x x x
    x x x x x x x x
    p p p p p p p p
    r k b k q b k r
*/
define(function (require) {

    // Dependencies
    var Graph = require("graph/graph"),
        Piece = require("game/piece"),

        board_map = require("data/board_map"),
        board_map_invert = require("data/board_map_invert"),
        board_map_illegal = require("data/board_map_illegal");

    function Board() {
        Graph.call(this, 10, 12);
        this.pieces = [];
    }

    // Inherit from graph prototype
    Board.prototype = Object.create(Graph.prototype);



    // Create a new piece
    Board.prototype.create = function (type, color, position) {
        return this.add(new Piece(type, color, position));
    };

    // Append piece
    Board.prototype.add = function (piece) {
        this.pieces[piece.position] = piece;
    };

    // Fetch one
    Board.prototype.find = function (index) {
        return this.pieces[index];
    };

    Board.prototype.findByType = function (type) {

    };

    // All pieces capable of being captured
    Board.prototype.threatened = function () {

    };

    // All pieces capable of making a capture
    Board.prototype.threatens = function () {

    };

    // Is currently threatened by any enemy
    Board.prototype.isThreatened = function (index) {

    };

    // Is currently threatening any enemy
    Board.prototype.isThreatening = function (index) {

    };

    // Fetch all
    Board.prototype.all = function () {
        return this.pieces;
    };

    // Move piece
    Board.prototype.move = function (from, to) {
        var piece = this.find(from);
        this.remove(from);
        piece.position = to;
        this.add(piece);
    };

    // Remove piece from the board
    Board.prototype.remove = function (index) {
        this.pieces[index] = undefined;
    };

    // Convert index to code
    Board.prototype.toCode = function (index) {
        return board_map[index];
    };

    // Convert code to index
    Board.prototype.fromCode = function (code) {
        return board_map_invert[code];
    };

    // Index contains piece
    Board.prototype.occupied = function (index) {
        return this.isPiece(this.find(index));
    };

    // Is a valid Chess piece
    Board.prototype.isPiece = function (piece) {
        return (typeof piece !== 'undefined');
    };

    // Map pieces to the board
    Board.prototype.setup = function (map, color) {
        var i;
        for (i in map) {
            this.create(map[i], color, this.fromCode(i));
        }
    };

    // Generate legal piece moves
    Board.prototype.getMoves = function (piece) {
        var offsets  = piece.movement.offsets,
            distance = piece.movement.distance,
            origin   = piece.position,
            current  = null,
            moves    = [],
            i, j;

        for (i = 0; i < offsets.length; i += 1) {
            current = origin + offsets[i];
            for (j = 0; j < distance; j += 1) {
                if (_.include(board_map_illegal, current)) {
                    break;
                } else if (this.occupied(current)) {
                    break;
                } else {
                    moves.push(current);
                    current += offsets[i];
                }
            }
        }

        return moves;
    };

    Board.prototype._buildInverted = function (map) {
        var i;
        for (i in map) {
            document.write("\"" + map[i] + "\": " + i + ", ");
        }
    };

    return Board;
});