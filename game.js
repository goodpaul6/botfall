function createGame() {
    return {
        bots: [],
        botsToAdd: [createBot({
            x: 100,
            y: 100,
        })],
    };
}

function gameAddBotNextFrame(game, bot) {
    game.botsToAdd.push(bot);
}

function gameUpdate(game, dt) {
    game.bots.push(...game.botsToAdd);
    game.botsToAdd.length = 0;

    for (const bot of game.bots) {
        botUpdate(bot, dt);
    }
}

function gameDraw(game, ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const bot of game.bots) {
        botDraw(bot, ctx);
    }
}
