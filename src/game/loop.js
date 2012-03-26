define(["shims/requestAnimFrame"], function (requestAnimFrame) {

    function Loop(game, render) {
        var now, last, dt, gdt, rdt;

        last = new Date().getTime();
        dt = 0;
        gdt = 0;
        rdt = 0;

        function frame() {

            // Temporal properties
            now = new Date().getTime();
            dt = Math.min(1, (now - last) / 1000);

            // Game update
            gdt += dt;
            while (gdt > game.step) {
                gdt -= game.step;
                game.update(dt);
            }

            // Render update
            rdt += dt;
            if (rdt > render.step) {
                rdt -= render.step;
                render.update(dt);
            }

            // Update time
            last = now;

            // Loop
            requestAnimFrame(frame);
        }

        frame();
    }

    return Loop;
});