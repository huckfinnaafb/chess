define(function (require) {

    var game     = require("game/chess"),
        board    = require("board/board"),
        pieceMap = require("piece/sprite_map"),
        Graph    = require("graph/graph"),
        pieces   = board.getPieces();

    return {
        canvas  : undefined,
        ctx     : undefined,
        fps     : 25,
        step    : 1 / 25,
        frame   : 0,

        init: function (canvasID) {
            this.canvas = canvasID;
            this.ctx = document.getElementById(canvasID).getContext('2d');
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

        update: function (dt) {
            this.setFrame(this.getFrame() + 1);
            this.draw(dt);
        },

        draw: function (dt) {
            var i;
            for (i = 0; i < pieces.length; i += 1) {
                if (typeof pieces[i] === 'undefined') {
                    continue;
                }

                this.piece(pieces[i]);
            }
        },

        piece: function (piece) {
            pieceMap.draw(

                // Context
                this.getContext(),

                // Piece
                piece,

                // Vector
                Graph.toVec2(
                    piece.getPosition(),
                    board.getWidth()
                )
            );
        }
    };
});