define(function (require) {

    // Dependencies
    var Graph = require("graph/graph"),
        Piece = require("game/piece"),

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
            this.pieces.push(new Piece(map[i], color, this.toIndex(i)));
        }
    };

    return Board;
});