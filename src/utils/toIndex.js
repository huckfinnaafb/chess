define(function () {
    function toIndex(width, vec2) {
        return ((vec2.y * width) + vec2.x);
    }

    return toIndex;
});