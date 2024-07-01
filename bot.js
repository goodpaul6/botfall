function createBot({
    x,
    y,
}) {
    const net = createNeural(3, 3, 1);

    const tx = 300 / 300 - 1.0;
    const ty = 100 / 300 - 1.0;

    for (let y = 0; y < 600; ++y) {
        for (let x = 0; x < 600; ++x) {
            const nx = x / 300 - 1.0;
            const ny = y / 300 - 1.0;

            const distToTarget = Math.sqrt(
                (tx - nx) * (tx - nx) + (ty - ny) * (ty - ny),
            );

            const inputMatrix = createMatrixFromColumnArrays([[
                nx,
                ny,
                distToTarget,
            ]]);

            const expectedOutput =
                // Maps from [-PI, PI] to [0, 1]
                (Math.atan2(ty - ny, tx - nx) / Math.PI) / 2 + 0.5;

            neuralTrain(
                bot.net,
                inputMatrix,
                createMatrixFromColumnArrays([[
                    expectedOutput,
                ]]),
            );
        }
    }

    return {
        startX: x,
        startY: y,
        x,
        y,
        speed: 20,
        angle: 0,
        net,
    };
}

function botUpdate(bot, dt) {
    const tx = 300 / 300 - 1.0;
    const ty = 100 / 300 - 1.0;

    const nx = x / 300 - 1.0;
    const ny = y / 300 - 1.0;

    const distToTarget = Math.sqrt(
        (tx - nx) * (tx - nx) + (ty - ny) * (ty - ny),
    );

    const inputMatrix = createMatrixFromColumnArrays([[
        nx,
        ny,
        distToTarget,
    ]]);

    const netOutput = neuralFeedForward(
        bot.net,
        inputMatrix,
    );

    const outputAngle = matrixGet(netOutput, 0, 0);

    bot.angle = ((outputAngle - 0.5) * 2) * Math.PI;

    const dx = Math.cos(bot.angle) * bot.speed * dt;
    const dy = Math.sin(bot.angle) * bot.speed * dt;

    bot.x += dx;
    bot.y += dy;
}

function botDraw(bot, ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(bot.x, bot.y, 30, 30);
}
