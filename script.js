const date = new Date();
console.log(date);

const prevBtn = document.querySelector('.fa-angle-left');
const nextBtn = document.querySelector('.fa-angle-right');

makeCalendar(date);

prevBtn.addEventListener('click', () => {
  newDate = new Date(date.setMonth(date.getMonth()-1, 1));
  makeCalendar(newDate);
});


nextBtn.addEventListener('click', () => {
  newDate = new Date(date.setMonth(date.getMonth()+1, 1));
  makeCalendar(newDate);
});


function makeCalendar(newDate) {

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
    if( i === new Date().getDate() && newDate.getMonth() === new Date().getMonth() ) {
      days += `<div class='today'>${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    };
  };

  for(let y=1; y <= 42 - firstDayIndex - lastDay; y++) {
    days += `<div class='next-date'>${y}</div>`;
  };

  monthDays.innerHTML = days;

}


