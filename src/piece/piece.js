define(function (require) {
    function Piece(type, color, position) {
        this.color = color;
        this.position = position;
        this.type = type;
    }

    Piece.prototype = {

        // Returns enemy color
        enemy: function () {
            if (this.color === 'white') {
                return 'black';
            } else {
                return 'white';
            }
        }
    };

    return Piece;
});