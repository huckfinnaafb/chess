define(function (require) {

    var pieceSpriteMap = require("data/sprite_pieces");

    function Camera(canvas, game) {
        this.canvas = canvas;
        this.game = game;
        this.fps = 25;
        this.step = 1 / 25;
        this.pieceSize = 80;

        this.ctx = document.getElementById(canvas).getContext("2d");
    }

    Camera.prototype.update = function (dt) {
        this.draw(dt);
    };

    Camera.prototype.draw = function (dt) {
        this.all(this.game.board.pieces);
    };

    Camera.prototype.all = function (pieces) {
        var i;
        for (i = 0; i < pieces.length; i += 1) {
            this.piece(pieces[i]);
        }
    };

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    Camera.prototype.piece = function (piece) {
        var position = this.game.board.toVec2(piece.position);
        return pieceSpriteMap.draw(this.ctx, piece, position);
    };

    return Camera;
});