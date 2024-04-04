import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

// Функція для показу повідомлення про помилку
function showToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

// Функція для валідації дати та активації кнопки Start
function validateDate() {
  const selectedDate = new Date(datePicker.value);
  const currentDate = new Date();

  // Перевіряємо, чи вибрана дата в майбутньому та валідного формату
  if (
    isNaN(selectedDate.getTime()) ||
    selectedDate.getTime() <= currentDate.getTime()
  ) {
    showToast('Please choose a valid date in the future');
    startBtn.disabled = true;
  } else {
    startBtn.disabled = false;
  }
}

// Ініціалізуємо flatpickr
flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validateDate();
  },
});

// Функція для відображення таймера
function startTimer() {
  datePicker.disabled = true;
  startBtn.disabled = true;
  const selectedDate = new Date(datePicker.value);
  const interval = setInterval(() => {
    const currentDate = new Date();
    const remainingTime = selectedDate - currentDate;

    if (remainingTime <= 0) {
      clearInterval(interval);
      daysElem.textContent = '00';
      hoursElem.textContent = '00';
      minutesElem.textContent = '00';
      secondsElem.textContent = '00';
      showToast('Timer has ended');
      datePicker.disabled = false;
      startBtn.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      daysElem.textContent = addLeadingZero(days);
      hoursElem.textContent = addLeadingZero(hours);
      minutesElem.textContent = addLeadingZero(minutes);
      secondsElem.textContent = addLeadingZero(seconds);
    }
  }, 1000);
}

// Обробник події кліку на кнопці Start
startBtn.addEventListener('click', startTimer);

// Функція для додавання нуля
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для конвертації мілісекунд у формат дні:години:хвилини:секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
