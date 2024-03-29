define(["piece/sprite"], function (sprite) {

    return {
        size: 80,
        black: {
            "King"  : [0, 0],
            "Queen" : [1, 0],
            "Rook"  : [2, 0],
            "Bishop": [3, 0],
            "Knight": [4, 0],
            "Pawn"  : [5, 0]
        },
        white: {
            "King"  : [0, 1],
            "Queen" : [1, 1],
            "Rook"  : [2, 1],
            "Bishop": [3, 1],
            "Knight": [4, 1],
            "Pawn"  : [5, 1]
        },

        /*
            Draw a piece
            @param ctx canvas context
            @param piece piece object
            @param image image sprite object
            @param position vector object (see Vec2)

            @return ctx.drawImage return value
        */
        draw: function (ctx, piece, position) {
            ctx.drawImage(

                // Image object
                sprite,

                // Source X Offset
                this[piece.color][piece.type][0] * this.size,

                // Source Y Offset
                this[piece.color][piece.type][1] * this.size,

                // Source width
                this.size,

                // Source height
                this.size,

                // Destination X Offset
                (position.x - 1) * this.size,

                // Destination Y Offset
                (position.y - 2) * this.size,

                // Destination width
                this.size,

                // Destination height
                this.size
            );
        }
    };
});