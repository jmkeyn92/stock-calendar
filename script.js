const date = new Date();
console.log(date);

// date.setMonth(5);

// date.setDate(1);
// console.log(date.getDay());

// const monthDays = document.querySelector('.days');
// const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
// const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const nextBtn = document.querySelector('.fa-angle-right');

makeCalendar(date);

nextBtn.addEventListener('click', () => {
  newDate = new Date(date.setMonth(date.getMonth()+1));
  console.log(date.getMonth());
  console.log(newDate);
  makeCalendar(newDate);
});


function makeCalendar(newDate) {

  const monthDays = document.querySelector('.days');
  const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
  console.log(lastDay);
  const prevLastDay = new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate();

  newDate.setDate(1);
  const firstDayIndex = newDate.getDay();
  date.setDate(lastDay);
  const lastDayIndex = newDate.getDay();
  console.log(lastDayIndex);

  // const nextFirstDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();


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

  let days = '';

  for(let x=firstDayIndex; x>0; x--) {
    days += `<div class='prev-date'>${prevLastDay - x + 1}</div>`;
  };


  for(let i=1; i<=lastDay; i++) {
    if( i === new Date().getDate() && newDate.getMonth() === new Date().getMonth() ) {
      days += `<div class='today'>${i}</div>`;
      // console.log(date.getMonth);
      // console.log(new Date().getMonth());
    } else {
      days += `<div>${i}</div>`;
    };
  };

  for(let y=1; y<7-lastDayIndex; y++) {
    days += `<div class='next-date'>${y}</div>`;
  };

  monthDays.innerHTML = days;

  // console.log(days);

}


// date.setDate(1);
//   const firstDayIndex = date.getDay();
//   date.setDate(lastDay);
//   const lastDayIndex = date.getDay();
//   // console.log(lastDayIndex);

//   // const nextFirstDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();


//   const months = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];

//   document.querySelector('.date h1').innerHTML = months[date.getMonth()];
//   document.querySelector('.date p').innerHTML = date.toDateString();

//   let days = '';

//   for(let x=firstDayIndex; x>0; x--) {
//     days += `<div class='prev-date'>${prevLastDay - x + 1}</div>`;
//   };


//   for(let i=1; i<=lastDay; i++) {
//     if( i === new Date().getDate() && date.getMonth() === new Date().getMonth() ) {
//       days += `<div class='today'>${i}</div>`;
//       // console.log(date.getMonth);
//       // console.log(new Date().getMonth());
//     } else {
//       days += `<div>${i}</div>`;
//     };
//   };

//   for(let y=1; y<7-lastDayIndex; y++) {
//     days += `<div class='next-date'>${y}</div>`;
//   };

//   monthDays.innerHTML = days;

//   // console.log(days);
