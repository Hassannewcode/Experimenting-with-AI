const canvas = document.getElementById('oscilloscope-display');
const ctx = canvas.getContext('2d');

let isRunning = true;
let amplitude = 5;
let frequency = 5;
let offset = 0;
let time = 0;

const amplitudeInput = document.getElementById('amplitude-input');
const frequencyInput = document.getElementById('frequency-input');
const offsetInput = document.getElementById('offset-input');

amplitudeInput.addEventListener('input', (e) => {
    amplitude = e.target.value;
    if (!isRunning) draw();
});

frequencyInput.addEventListener('input', (e) => {
    frequency = e.target.value;
    if (!isRunning) draw();
});

offsetInput.addEventListener('input', (e) => {
    offset = Number(e.target.value);
    if (!isRunning) draw();
});

function draw() {
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set line style
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 2;

    // Begin drawing path
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    // Draw sine wave
    for (let x = 0; x < canvas.width; x++) {
        const y = (canvas.height / 2) - (Math.sin(x / (20 * (11-frequency)) + time) * (canvas.height / 2 * (amplitude / 10))) + offset;
        ctx.lineTo(x, y);
    }

    ctx.stroke();

    // Increment time for animation
    if (isRunning) {
        time += 0.1;
        requestAnimationFrame(draw);
    }
}

const startStopBtn = document.getElementById('start-stop-btn');

startStopBtn.addEventListener('click', () => {
    isRunning = !isRunning;
    if (isRunning) {
        draw();
    }
});

// Initial draw
draw();
