define(function (require) {
    var Chess = {
        fps: 25,
        frame: 0,
        step: 1 / 25,

        init: function () {

        },

        update: function (dt) {
            this.frame += 1;
        }
    };

    // Initialize
    Chess.init();

    return Chess;
});