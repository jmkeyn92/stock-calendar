'use strict';

const date = new Date();
console.log(date.getDate());

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const prevBtn = document.querySelector('.fa-angle-left');
const nextBtn = document.querySelector('.fa-angle-right');

const weekBtn = document.querySelector('#week');
const dayBtn = document.querySelector('#day');



makeMonthCalendar(date);
// dayclickListener();

function dayclickListener() {
  const ListDayBtn = document.querySelectorAll('.daytemp');
  // console.log(ListDayBtn)

  ListDayBtn.forEach(item => {
    item.addEventListener('click', () => {
      console.log(item.textContent)
      // const dateThisPageStr = document.querySelector('div p')
      // const dateThisPage = new Date(dateThisPageStr);
      date.setDate(item.textContent)
      // console.log(date);
      // console.log('--------')
      makeDayCalendar(date)
    });
  });
};



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
  document.querySelector('.date h1').innerHTML = months[newDate.getMonth()];
  document.querySelector('.date p').innerHTML = newDate.toDateString();
  document.querySelector('.days').remove();
  // if( document.querySelector('.days') ) {
  //   document.querySelector('.days').remove();
  // };
  document.querySelector('.weekdays').className = 'day--case'
  
  // document.querySelector('.weekdays').classList.add('day--case')

  const theDay = document.querySelector('.day--case');
  console.log(newDate);
  const newDateFormat = newDate.toLocaleDateString('pt-br').split('/').reverse().join('-');
  // const newDateFormat = newDate.toISOString().split('T')[0];
  console.log(newDateFormat)


  let obj;
  fetch('calendarDB.json')
    .then(res => res.json())
    // .then(data => obj = data)
    .then(data => obj = data)
    .then(() => {
      console.log(obj);
      console.log(obj[newDateFormat]);
      let day = '';
      if( newDate.getDate() === new Date().getDate() && newDate.getMonth() === new Date().getMonth() && newDate.getFullYear() === new Date().getFullYear() ) {
        day += `<div class="day today">${JSON.stringify(obj[newDateFormat])}</div>`;
      } else {
        day += `<div class="day">${JSON.stringify(obj[newDateFormat]).replace(/["]+/g, '')}</div>`;
      };
      theDay.innerHTML = day;
    });
    // return obj;

  // const calendarDB = JSON.parse(calendarDB);
  // print(calendarDB);

  // console.log(obj);
  // getData();

  let day = '';
  // console.log(newDate.getDate());
  if( newDate.getDate() === new Date().getDate() && newDate.getMonth() === new Date().getMonth() && newDate.getFullYear() === new Date().getFullYear() ) {
    day += `<div class="day today">${data[newDateFormat]}</div>`;
  } else {
    day += `<div class="day">${data[newDateFormat]}</div>`;
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
  // dayclick(); ???

};


function makeMonthCalendar(newDate) {
  const monthDays = document.querySelector('.days');
  const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate();

  document.querySelector('.date h1').innerHTML = months[newDate.getMonth()];
  document.querySelector('.date p').innerHTML = newDate.toDateString();

  newDate.setDate(1);
  const firstDayIndex = newDate.getDay();
  newDate.setDate(lastDay);
  const lastDayIndex = newDate.getDay();

  let days = '';

  for(let x=firstDayIndex; x>0; x--) {
    days += `<div class='prev-date daytemp ${prevLastDay - x + 1}'>${prevLastDay - x + 1}</div>`;
  };


  for(let i=1; i<=lastDay; i++) {
    if( i === new Date().getDate() && newDate.getMonth() === new Date().getMonth() && newDate.getFullYear() === new Date().getFullYear() ) {
      days += `<div class="today daytemp ${i}">${i}</div>`;
    } else {
      days += `<div class="daytemp ${i}">${i}</div>`;
    };
  };

  for(let y=1; y <= 42 - firstDayIndex - lastDay; y++) {
    days += `<div class="next-date daytemp ${y}">${y}</div>`;
  };

  monthDays.innerHTML = days;
  newDate.setDate(new Date().getDate());
  dayclickListener();

}


