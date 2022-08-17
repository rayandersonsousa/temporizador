const control = document.getElementById('control');
const reset = document.getElementById('reset');
const min = document.getElementById('minutes');
const sec = document.getElementById('seconds');

let interval = null;
let remainingSeconds = 0;

const updateTimer = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    min.innerText = minutes.toString().padStart(2, '0');
    sec.innerText = seconds.toString().padStart(2, '0');
};

const updateButtons = () => {
    if(interval === null) {
        control.classList.add('start');
        control.classList.remove('stop');
    } else {
        control.classList.add('stop');
        control.classList.remove('start');
    }
}

const stop = () => {
    clearInterval(interval);

    interval = null;

    updateButtons();
}

const start = () => {
    if(remainingSeconds === 0) return;

    interval = setInterval(() => {
        remainingSeconds -= 1;
        updateTimer();

        if (remainingSeconds === 0) {
            stop();
        }
    }, 1000);

    updateButtons();
}

control.addEventListener('click', () => {
    if (interval === null) {
        start();
    } else {
        stop();
    }
});

reset.addEventListener('click', () => {
    const inputMinutes = prompt('Digite o tempo em minutos:');

    if (inputMinutes < 60) {
        stop();
        remainingSeconds = inputMinutes * 60;
        updateTimer();
    }
});
