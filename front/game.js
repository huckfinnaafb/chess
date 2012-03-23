require.config({
   baseUrl: "../src/",
   paths: {
        "jquery": "http://code.jquery.com/jquery-1.7.1.min",
        "underscore": "http://documentcloud.github.com/underscore/underscore-min"
    },
    waitSeconds: 15
});

require(["game/board", "game/piece"], function (Board, Piece) {
    var ChessBoard = new Board(8, 8);

    ChessBoard.pieces.push(new Piece("queen"));

    window.board = ChessBoard;
});