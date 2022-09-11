import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    inputElem: document.querySelector('input#datetime-picker'),
    startElem: document.querySelector('button[data-start]'),
    daysElem: document.querySelector('span[data-days]'),
    hoursElem: document.querySelector('span[data-hours]'),
    minutesElem: document.querySelector('span[data-minutes]'),
    secondsElem: document.querySelector('span[data-seconds]'),
};

let goalDate;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (timerId) {
            Notiflix.Notify.warning('Оновіть сторінку :');
            return;
        }
        if (Date.now() > selectedDates[0]) {
            Notiflix.Notify.failure('Оберіть дату у майбутньому :');
            return;
        }
        console.log(selectedDates[0]);
        goalDate = selectedDates[0];

        refs.startElem.disabled = false;
    },
};

flatpickr(refs.inputElem, options);

refs.startElem.disabled = true;

console.log(options.defaultDate);

refs.startElem.addEventListener('click', () => {
    startTimer();
    refs.startElem.disabled = true;
});

function startTimer() {
    Notiflix.Notify.success('Відлік почався');
    timerId = setInterval(() => {
        const difTime = goalDate - Date.now();
        const { days, hours, minutes, seconds } = convertMs(difTime);
        refs.daysElem.textContent = addLeadingZero(days);
        refs.hoursElem.textContent = addLeadingZero(hours);
        refs.minutesElem.textContent = addLeadingZero(minutes);
        refs.secondsElem.textContent = addLeadingZero(seconds);

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(timerId);
            refs.startElem.disabled = false;
            Notiflix.Notify.info('Відлік закінчився');
            timerId = null;
        }
    }, 1000);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}