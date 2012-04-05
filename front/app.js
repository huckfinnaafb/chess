require.config({
   baseUrl: "../src/",
   paths: {
        "jquery": "http://code.jquery.com/jquery-1.7.1.min",
        "underscore": "vendor/underscore"
    },
    waitSeconds: 15
});

require(["game/chess", "render/camera", "utils/loop", "utils/relMouseCoords", "jquery", "piece/movement"],
function (Chess, Camera, loop, relMouseCoords, $, movement) {

    Camera.setCanvas("chess");
    Camera.setContext(document.getElementById("chess").getContext('2d'));

    loop(Chess, Camera);

    window.Chess = Chess;
    window.Camera = Camera;
    window.movement = movement;

    $("#move").submit(function (event) {
        event.preventDefault();
        var from = $("#from").val(),
            to = $("#to").val();

        Chess.move(from, to);
    });

});