define(function () {
    function Piece(type, color, position) {
        this.color = color;
        this.position = position;
        this.type = type;
        this.moved = 0;
    }

    Piece.prototype = {

        getColor: function () {
            return this.color;
        },

        getPosition: function () {
            return this.position;
        },

        getType: function () {
            return this.type;
        },

        setColor: function (color) {
            this.color = color;
        },

        setPosition: function (position) {
            this.position = position;
        },

        setType: function (type) {
            this.type = type;
        },

        move: function (position) {
            this.position = position;
            this.moved += 1;
        }
    };

    return Piece;
});