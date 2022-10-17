const control = document.getElementById('control');
const reset = document.getElementById('reset');
const min = document.getElementById('minutes');
const sec = document.getElementById('seconds');
const audio = document.createElement('audio');
audio.setAttribute('src', '/src/oh-yeah-mario-time.mp3')
const marioContainer = document.querySelector('.marioContainer');
const runningMario= document.createElement('img');
runningMario.setAttribute('src', '/src/mario-nobg.gif');
runningMario.setAttribute('id', 'running');

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

  runningMario.remove()
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
  marioContainer.appendChild(runningMario);
}

control.addEventListener('click', () => {
  if (interval === null) {
    start();
    audio.play();
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
