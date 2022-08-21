'use strict';

const date = new Date();
console.log(date.getDate());


const prevBtn = document.querySelector('.fa-angle-left');
const nextBtn = document.querySelector('.fa-angle-right');

const weekBtn = document.querySelector('#week');
const dayBtn = document.querySelector('#day');

makeMonthCalendar(date);

weekBtn.addEventListener('click', (event) => {
  // console.log(event.target);
  makeWeekCalendar(date);
});

dayBtn.addEventListener('click', () => {
  console.log(date.getDate());
  makeDayCalendar(date);
});

prevBtn.addEventListener('click', () => {
  const newDate = new Date(date.setMonth(date.getMonth()-1, 1));
  makeMonthCalendar(newDate);
});

nextBtn.addEventListener('click', () => {
  const newDate = new Date(date.setMonth(date.getMonth()+1, 1));
  makeMonthCalendar(newDate);
});


function makeDayCalendar(newDate) {
  // document.querySelector('.weekdays').remove();
  document.querySelector('.days').remove();

  const theDay = document.querySelector('.weekdays');

  let day = '';
  // console.log(newDate.getDate());
  if( newDate.getDate() === new Date().getDate() && newDate.getMonth() === new Date().getMonth() && newDate.getFullYear() === new Date().getFullYear() ) {
    day += `<div class="day today">${newDate.getDate()}<div class="day__content"></div></div>`;
  } else {
    day += `<div class="day">${newDate.getDate()}<div class="day__content"></div></div>`;
  };
  theDay.innerHTML = day;
};



function makeWeekCalendar(newDate) {
  const weekDays = document.querySelector('.days');
  const firstDayWeek = newDate.getDate()-newDate.getDay()

  let days = '';
  for(let i=0; i < 7; i++) {
    if( firstDayWeek + i === new Date().getDate() && newDate.getMonth() === new Date().getMonth() && newDate.getFullYear() === new Date().getFullYear() ) {
      days += `<div class="week today">${firstDayWeek + i}<div class="week__content"></div></div>`;
    } else {
      days += `<div class="week">${firstDayWeek + i}<div class="week__content"></div></div>`;
    };
  };
  weekDays.innerHTML = days;
};


function makeMonthCalendar(newDate) {
  const monthDays = document.querySelector('.days');
  const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  document.querySelector('.date h1').innerHTML = months[newDate.getMonth()];
  document.querySelector('.date p').innerHTML = newDate.toDateString();

  newDate.setDate(1);
  const firstDayIndex = newDate.getDay();
  newDate.setDate(lastDay);
  const lastDayIndex = newDate.getDay();

  let days = '';

  for(let x=firstDayIndex; x>0; x--) {
    days += `<div class='prev-date'>${prevLastDay - x + 1}</div>`;
  };


  for(let i=1; i<=lastDay; i++) {
    if( i === new Date().getDate() && newDate.getMonth() === new Date().getMonth() && newDate.getFullYear() === new Date().getFullYear() ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    };
  };

  for(let y=1; y <= 42 - firstDayIndex - lastDay; y++) {
    days += `<div class="next-date">${y}</div>`;
  };

  monthDays.innerHTML = days;
  newDate.setDate(new Date().getDate());

}


