define(["graph/vec2"], function (Vec2) {
    function toVec2(index, width) {
        return new Vec2(index % width, Math.floor(index / width));
    }

    return toVec2;
});