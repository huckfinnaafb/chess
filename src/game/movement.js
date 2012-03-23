define(["graph/vec2"], function (Vec2) {
    return {
        "king": {
            distance: 1,
            offsets: [Vec2.N, Vec2.S, Vec2.W, Vec2.E]
        },
        "rook": {
            distance: Infinity,
            offsets: [Vec2.N, Vec2.S, Vec2.W, Vec2.E]
        },
        "bishop": {
            distance: Infinity,
            offsets: [Vec2.NW, Vec2.NE, Vec2.SW, Vec2.SE]
        },
        "queen": {
            distance: Infinity,
            offsets: [
                Vec2.N,  Vec2.W,  Vec2.S,  Vec2.E,
                Vec2.NW, Vec2.NE, Vec2.SW, Vec2.SE
            ]
        },
        "knight": {
            distance: undefined,
            offsets: [
                new Vec2(2, 1),
                new Vec2(1, 2),
                new Vec2(-2, -1),
                new Vec2(-1, -2)
            ]
        },
        "pawn": {
            distance: 1,
            offsets: [Vec2.N, Vec2.S, Vec2.W, Vec2.E]
        }
    };
});