const GAME_MODES = {
    SETUP: 'setup',
    RUNNING: 'running',
};

const game = {
    mode: GAME_MODES.SETUP,
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function loop() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 30, 30);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

testMatrixModule();
testNeuralModule();
