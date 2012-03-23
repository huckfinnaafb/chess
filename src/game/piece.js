define(["game/movement"], function (movement) {

    function Piece(type, position) {
        this.type = type;
        this.movement = movement[type];
        this.position = position;
    }

    return Piece;
});