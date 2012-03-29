define({
    "King": {
        distance: 1,
        offsets: [1, -1, 10, -10]
    },
    "Rook": {
        distance: Infinity,
        offsets: [1, -1,  10, -10]
    },
    "Bishop": {
        distance: Infinity,
        offsets: [-11, 11, 9, -9]
    },
    "Queen": {
        distance: Infinity,
        offsets: [1, -1, 10, -10, -11, 11, 9, -9]
    },
    "Knight": {
        distance: 1,
        offsets: [12, -12, 8, -8, 21, -21, 19, -19]
    },
    "Pawn": {
        distance: 1,
        offsets: [-10, 10]
    }
});