require.config({
   baseUrl: "../src/",
   paths: {
        "jquery": "http://code.jquery.com/jquery-1.7.1.min",
        "underscore": "http://documentcloud.github.com/underscore/underscore-min"
    },
    waitSeconds: 15
});

require(["game/game"], function (Game) {

    var chess;

    // Instantiate
    chess = new Game("chess");

    // Configuration
    chess.config({
        fps: 25
    });

    // Load assets
    chess.preload();

    // Setup game
    chess.init();

    // Start round
    chess.play();

    window.chess = chess;
});