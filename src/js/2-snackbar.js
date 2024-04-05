import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const snackbarForm = document.querySelector('.form');

snackbarForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(snackbarForm.elements['delay'].value);
  const state = snackbarForm.elements['state'].value;

  const myPromise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });

  myPromise
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
