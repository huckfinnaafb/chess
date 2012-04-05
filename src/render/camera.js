define(function (require) {

    var game     = require("game/chess"),
        board    = require("board/board"),
        pieceMap = require("piece/sprite_map"),
        toVec2   = require("utils/toVec2"),
        pieces   = board.all();

    var Camera = {
        game    : game,
        board   : board,
        canvas  : undefined,
        ctx     : undefined,
        fps     : 10,
        step    : 1 / 10,
        frame   : 0,

        init: function () {

        },

        getCanvas: function () {
            return this.canvas;
        },

        getContext: function () {
            return this.ctx;
        },

        getFps: function () {
            return this.fps;
        },

        getStep: function () {
            return this.step;
        },

        getFrame: function () {
            return this.frame;
        },

        setCanvas: function (canvas) {
            this.canvas = canvas;
        },

        setContext: function (context) {
            this.ctx = context;
        },

        setStep: function (step) {
            this.step = step;
        },

        setFrame: function (frame) {
            this.frame = frame;
        },

        update: function () {
            this.frame += 1;
            this.clear(this.ctx);
            this.draw(this.ctx, pieces);
        },

        clear: function (context) {
            context.clearRect(
                0,
                0,
                this.ctx.canvas.width,
                this.ctx.canvas.height
            );
        },

        draw: function (context, pieces) {

            // Draw each piece
            _.each(pieces, function (piece) {
                this.drawPiece(context, piece);
            }, this);
        },

        drawPiece: function (context, piece) {
            pieceMap.draw(

                // Context
                context,

                // Piece
                piece,

                // Vector
                toVec2(
                    piece.getPosition(),
                    board.getWidth()
                )
            );
        }
    };

    // Initialize
    Camera.init();

    return Camera;
});