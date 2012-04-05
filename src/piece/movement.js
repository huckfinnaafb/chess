define(["board/config"], function (config) {
    var rank = config.width,
        file = 1;

    var Movement = {
        "King": {
            distance: 1,
            offsets: [
                 file,
                 rank,
                -file,
                -rank
            ]
        },

        "Rook": {
            distance: Infinity,
            offsets: [
                 file,
                 rank,
                -file,
                -rank
            ]
        },

        "Bishop": {
            distance: Infinity,
            offsets: [
                 rank + file,
                 rank - file,
                -rank + file,
                -rank - file
            ]
        },

        "Queen": {
            distance: Infinity,
            offsets: [
                 file,
                 rank,
                -file,
                -rank,
                 rank + file,
                 rank - file,
                -rank + file,
                -rank - file
            ]
        },

        "Knight": {
            distance: 1,
            offsets: [
                  rank + (file * 2),
                  rank - (file * 2),
                 -rank - (file * 2),
                 -rank + (file * 2),
                ( rank * 2) + file,
                ( rank * 2) - file,
                (-rank * 2) - file,
                (-rank * 2) + file
            ]
        },

        "Pawn": {
            distance: 1,

            offsets: [
                 rank,
                -rank
            ],

            captures: [
                 rank + file,
                -rank + file
            ]
        }
    };

    return Movement;
});