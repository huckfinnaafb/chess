define(function () {
    function invert(map) {
        var i, inverted = {};
        for (i in map) {
            inverted[map[i]] = i;
        }

        return inverted;
    }

    return invert;
});