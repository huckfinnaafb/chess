define(function (require) {

    var chess     = require("chess"),
        pieceMap = require("piece/sprite_map"),
        toVec2   = require("utils/toVec2"),
        _ = require("underscore");

    var Camera = {
        game    : chess,
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
            this.draw(this.ctx, chess);
        },

        clear: function (context) {
            context.clearRect(
                0,
                0,
                this.ctx.canvas.width,
                this.ctx.canvas.height
            );
        },

        // Master draw
        draw: function (context, game) {
            this.board(context, game.board);
        },

        // Draw board state
        board: function (context, board) {

            // Draw all pieces
            _.each(board.all(), function (piece) {
                this.piece(context, board, piece);
            }, this);
        },

        // Single piece draw
        piece: function (context, board, piece) {
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