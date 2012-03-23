define(function (require) {

    // Dependencies
    var Graph   = require("graph/graph"),
        map     = require("game/map"),
        invert  = require("util/invert"),
        Piece   = require("game/piece");


    function Board(width, length) {
        Graph.call(this, width, length);

        this.pieces = [];
        this.map = map;
        this.invertMap = invert(map);
    }

    Board.prototype = Object.create(Graph.prototype);

    Board.prototype.toCode = function (index) {
        return this.map[index];
    };

    Board.prototype.toIndex = function (code) {
        return this.invertMap[code];
    };

    Board.prototype.setup = function (map) {
        var i;
        for (i in map) {
            this.pieces.push(new Piece(i, this.toIndex(map[i])));
        }
    };

    return Board;
});