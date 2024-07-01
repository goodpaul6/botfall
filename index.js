const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = createGame();

const addBotButton = document.getElementById('add-bot');
addBotButton.addEventListener('click', () => {
    gameAddBotNextFrame(
        game,
        createBot({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
        }),
    );
});

let lastFrameTime = Date.now();

function loop() {
    const now = Date.now();
    const dt = (now - lastFrameTime) / 1000;
    lastFrameTime = now;

    gameUpdate(game, dt);
    gameDraw(game, ctx);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

testMatrixModule();
testNeuralModule();
