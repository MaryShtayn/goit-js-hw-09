// Напиши скрипт, який після натискання кнопки «Start»,
// раз на секунду змінює колір фону < body > на випадкове значення,
// використовуючи інлайн стиль.Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
// Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною(disabled).

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let intervalId = null;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

btnStop.disabled = true;

function onBtnStartClick(evn) {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  btnStart.disabled = true;
  btnStop.disabled = false;
}

function onBtnStopClick(evn) {
  clearInterval(intervalId);

  btnStop.disabled = true;
  btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
