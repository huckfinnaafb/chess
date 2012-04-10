require.config({
   baseUrl: "../src/",
   paths: {
        "jquery": "http://code.jquery.com/jquery-1.7.1.min",
        "underscore": "vendor/underscore"
    },
    waitSeconds: 15
});

require(["chess", "render/canvas", "utils/loop", "jquery"],
function (Chess, Camera, loop, $) {

    Camera.setCanvas("chess");
    Camera.setContext(document.getElementById("chess").getContext('2d'));

    loop(Chess, Camera);

    $("#move").submit(function (event) {
        event.preventDefault();
        var from = $("#from").val(),
            to = $("#to").val();

        Chess.move(from, to);
    });

});