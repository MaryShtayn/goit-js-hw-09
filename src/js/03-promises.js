// Write a script that, when submitting the form, calls the createPromise(position, delay)
// function as many times as you entered in the amount field.On each call, pass it the number of the promise
// to be created(position) and the delay given the first delay(delay) and step(step) entered by the user.
// Supplement the code of the createPromise function so that it returns one promise that will be fulfilled or rejected
// after delay time.The value of the promise must be an object containing the position and delay properties with the values
// of these parameters.
// Use the initial function code to choose whether to fulfill or reject the promise.

// Достучаться до инпутов формы
// Поставить прослушиватель на кнопку сабмит с колбеком онСабмит
// Привязать эмоунт (количество) к количеству раз, вызова функции setInterval
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget.elements;

  setTimeout(() => {
    let position = 1;

    createPromise(position, delay.value)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    if (Number(amount.value) === 1) {
      return;
    }

    const id = setInterval(() => {
      position += 1;

      createPromise(position, delay.value)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `Fulfilled promise ${position} in ${
              Number(delay) + Number(step.value) * (position - 1)
            }ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `Rejected promise ${position} in ${
              Number(delay) + Number(step.value) * (position - 1)
            }ms`
          );
        })
        .finally(() => {
          if (position === Number(amount.value)) {
            clearInterval(id);
          }
        });
    }, step.value);
  }, delay.value);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
