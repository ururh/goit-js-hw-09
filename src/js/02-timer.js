import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';
let today;
let selectedDay;
const elements = {
    dataInput: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]')
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() <= Date.now()) {
          elements.btnStart.disabled = true;
            Report.failure("Please choose a date in the future")
        } else {
            selectedDay = selectedDates[0].getTime();
            elements.btnStart.disabled = false;
        }
  },
}
flatpickr(elements.dataInput, options) 
elements.btnStart.addEventListener("click", onClickStart)

function onClickStart() {
  let interval = setInterval(() => {
      elements.btnStart.disabled = true;
      today = Date.now();
      const result = selectedDay - today;
    textMs(convertMs(result))
    if (result <= 1000) {
    clearInterval(interval);
    elements.btnStart.disabled = false;
  }
  }, 1000)
  
}

function textMs({ days, hours, minutes, seconds }) {
  elements.dataDays.textContent = `${days}`;
  elements.dataHours.textContent = `${hours}`;
  elements.dataMinutes.textContent = `${minutes}`;
  elements.dataSeconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = String(Math.floor(ms / day)).padStart(2, '0');
  // Remaining hours
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  // Remaining minutes
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, '0');
  // Remaining seconds
  const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, '0');

  return { days, hours, minutes, seconds };
}
