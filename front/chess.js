require.config({
   baseUrl: "../src/",
   paths: {
        "jquery": "http://code.jquery.com/jquery-1.7.1.min",
        "underscore": "http://documentcloud.github.com/underscore/underscore-min"
    },
    waitSeconds: 15
});

require(["game/game", "render/camera", "game/loop"], function (Game, Camera, loop) {

    var chess = new Game(),
        renderer = new Camera("chess", chess);

    loop(chess, renderer);
});