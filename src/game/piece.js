define(function (require) {

    var movement = require("data/piece_movement");

    function Piece(type, color, position) {
        this.type = type;
        this.color = color;
        this.position = position;
    }

    return Piece;
});