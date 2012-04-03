define(function (require) {
    var signals = require("vendor/signals"),
        Signal = signals.Signal;

    var Event = {
        loaded: new Signal()
    };

    return Event;
});