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
    var Graph               = require("graph/graph"),
        Piece               = require("piece/piece"),

        board_map           = require("board/map"),
        board_map_invert    = require("board/map_invert"),
        board_map_illegal   = require("board/illegal");

    function Board() {
        Graph.call(this, 10, 12);
        this.pieces = [];
    }

    Board.prototype = Object.create(Graph.prototype);

    Board.prototype.create = function (type, color, position) {
        return this.add(new Piece(type, color, position));
    };

    Board.prototype.add = function (piece) {
        this.pieces[piece.position] = piece;
    };

    Board.prototype.find = function (index) {
        return this.pieces[index];
    };

    Board.prototype.all = function () {
        return this.pieces;
    };

    Board.prototype.move = function (from, to) {
        if (this.isOccupied(from)) {
            var piece = this.find(from);
            this.remove(from);
            piece.position = to;
            this.add(piece);
        }
    };

    Board.prototype.remove = function (index) {
        this.pieces[index] = undefined;
    };

    Board.prototype.toCode = function (index) {
        return board_map[index];
    };

    Board.prototype.fromCode = function (code) {
        return board_map_invert[code];
    };

    Board.prototype.isOccupied = function (index) {
        return !!this.find(index);
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

    // Generate legal moves
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
                } else if (this.isOccupied(current)) {
                    break;
                } else {
                    moves.push(current);
                    current += offsets[i];
                }
            }
        }

        return moves;
    };

    Board.prototype._buildInvertMap = function (map) {
        var i;
        for (i in map) {
            document.write("\"" + map[i] + "\": " + i + ", ");
        }
    };

    return Board;
});