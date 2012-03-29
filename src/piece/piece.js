define(function (require) {

    var movement = require("piece/movement");

    function Piece(type, color, position) {
        this.type = type;
        this.color = color;
        this.position = position;
        this.movement = movement[this.type];
    }

    return Piece;
});