define(function (require) {

    // Dependencies
    var Graph = require("graph/graph"),
        Piece = require("game/piece"),

        // Board map
        board_map = require("data/board_map"),
        board_map_invert = require("data/board_map_invert");

    function Board() {
        Graph.call(this, 8, 8);
        this.pieces = [];
    }

    Board.prototype = Object.create(Graph.prototype);

    Board.prototype.toCode = function (index) {
        return board_map[index];
    };

    Board.prototype.toIndex = function (code) {
        return board_map_invert[code];
    };

    Board.prototype.setup = function (map, color) {
        var i;
        for (i in map) {
            this.add(new Piece(map[i], color, this.toIndex(i)), this.toIndex(i));
        }
    };


    // Create
    Board.prototype.create = function (type, color, position) {
        return this.pieces.push(new Piece(type, color, position));
    };

    // Fetch
    Board.prototype.find = function (index) {
        return _.find(this.all(), function (piece) {
            return piece.position == index;
        });
    };

    // Update
    Board.prototype.update = function (piece, properties) {

    };

    // Remove
    Board.prototype.remove = function (index) {

    };

    // Index contains piece
    Board.prototype.occupied = function (index) {
        return !_.any(this.all(), function (piece) {
            piece.position == index;
        });
    };

    Board.prototype.add = function (piece, index) {
        this.pieces.push(piece);
    };

    Board.prototype.all = function () {
        return this.pieces;
    };

    return Board;
});