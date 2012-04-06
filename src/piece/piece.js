define(function () {
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
        },

        getPosition: function () {
            return this.position;
        },

        setPosition: function (position) {
            this.position = position;
        }
    };

    return Piece;
});