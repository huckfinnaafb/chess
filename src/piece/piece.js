define(function (require) {

    var movement = require("piece/movement");

    function Piece(type, color, position) {
        this.color = color;
        this.movement = movement[type];
        this.position = position;
        this.type = type;
    }

    Piece.prototype.getColor = function () {
        return this.color;
    };

    Piece.prototype.getMovement = function () {
        return this.movement;
    };

    Piece.prototype.getPosition = function () {
        return this.position;
    };

    Piece.prototype.getType = function () {
        return this.type;
    };

    Piece.prototype.setColor = function (color) {
        this.color = color;
    };

    Piece.prototype.setMovement = function (movement) {
        this.movement = movement;
    };

    Piece.prototype.setPosition = function (position) {
        this.position = position;
    };

    Piece.prototype.setType = function (type) {
        this.type = type;
    };

    return Piece;
});