"use strict";

const calendar = document.querySelector(".calendar");

const date = new Date();
console.log(date.getDate());

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const prevBtn = document.querySelector(".fa-angle-left");
const nextBtn = document.querySelector(".fa-angle-right");

const monthBtn = document.querySelector("#month");
const weekBtn = document.querySelector("#week");
const dayBtn = document.querySelector("#day");

makeMonthCalendar(date);
// dayclickListener();

function dayclickListener() {
  const ListDayBtn = document.querySelectorAll(".daytemp");
  // console.log(ListDayBtn)

  ListDayBtn.forEach((item) => {
    item.addEventListener("click", () => {
      monthBtn.classList.remove('active');
      weekBtn.classList.remove('active');
      dayBtn.classList.add('active');
      console.log(item.textContent);
      // const dateThisPageStr = document.querySelector('div p')
      // const dateThisPage = new Date(dateThisPageStr);
      date.setDate(item.textContent);
      // console.log(date);
      // console.log('--------')
      makeDayCalendar(date);
    });
  });
}

monthBtn.addEventListener("click", (event) => {
  weekBtn.classList.remove('active');
  dayBtn.classList.remove('active');
  monthBtn.classList.add('active');
  makeMonthCalendarEx(date);
});

weekBtn.addEventListener("click", (event) => {
  // console.log(event.target);
  monthBtn.classList.remove('active');
  dayBtn.classList.remove('active');
  weekBtn.classList.add('active');
  // makeMonthCalendarEx(date);
  makeWeekCalendar(date);
});

dayBtn.addEventListener("click", () => {
  monthBtn.classList.remove('active');
  weekBtn.classList.remove('active');
  dayBtn.classList.add('active');
  console.log(date.getDate());
  // makeMonthCalendarEx(date);
  makeDayCalendar(date);
});

prevBtn.addEventListener("click", () => {

  const periodSelected = document.querySelectorAll(".period__item");
  periodSelected.forEach(item => {
    console.log(item.classList);
    console.log(item.classList.value);
    if (item.classList.value.includes('active')) {
      periodTab = item.textContent;
    }
  });
  console.log(periodTab);
  if (periodTab==='Month') {
    const newDate = new Date(date.setMonth(date.getMonth() - 1, 1));
    makeMonthCalendar(newDate);
  } else if (periodTab==='Week') {
    const dateWeek = document.querySelector('div.date p')
    console.log(dateWeek.textContent);
    const newDate = Date.parse(dateWeek.textContent);
    console.log(newDate);
    // 6.048e+8 => 7day milliseconds
    const newDateNext = new Date(newDate - 6.048e+8);
    console.log(newDateNext);
    // 월과 날짜를 다시 적어준다
    document.querySelector(".date h1").innerHTML = months[newDateNext.getMonth()];
    document.querySelector(".date p").innerHTML = newDateNext.toDateString();
    makeWeekCalendar(newDateNext);
  } else {
    console.log('Day');
  };

  // const newDate = new Date(date.setMonth(date.getMonth() - 1, 1));
  // makeMonthCalendar(newDate);
});

let periodTab = '';
nextBtn.addEventListener("click", () => {
  const periodSelected = document.querySelectorAll(".period__item");
  periodSelected.forEach(item => {
    console.log(item.classList);
    console.log(item.classList.value);
    if (item.classList.value.includes('active')) {
      periodTab = item.textContent;
    }
  });
  console.log(periodTab);
  if (periodTab==='Month') {
    const newDate = new Date(date.setMonth(date.getMonth() + 1, 1));
    makeMonthCalendar(newDate);
  } else if (periodTab==='Week') {
    const dateWeek = document.querySelector('div.date p')
    console.log(dateWeek.textContent);
    const newDate = Date.parse(dateWeek.textContent);
    console.log(newDate);
    // 6.048e+8 => 7day milliseconds
    const newDateNext = new Date(newDate + 6.048e+8);
    console.log(newDateNext);
    // 월과 날짜를 다시 적어준다
    document.querySelector(".date h1").innerHTML = months[newDateNext.getMonth()];
    document.querySelector(".date p").innerHTML = newDateNext.toDateString();
    makeWeekCalendar(newDateNext);
  } else {
    console.log('Day');
  };
  
});

// make day calendar
function makeDayCalendar(newDate, ID) {
  // document.querySelector(".date h1").innerHTML = months[newDate.getMonth()];
  // document.querySelector(".date p").innerHTML = newDate.toDateString();
  try {
    document.querySelector(".days").remove();
  } catch {
    document.querySelector(".week").remove();
  };

  // document.querySelector(".days").remove();
  // if( document.querySelector('.days') ) {
  //   document.querySelector('.days').remove();
  // };
  document.querySelector(".weekdays").className = "day--case";
  const theDay = document.querySelector(".day--case");

  const dayStructure = `<div class="day--list"></div><div class="day--content"></div>`;
  theDay.innerHTML = dayStructure;
  const theDayList = document.querySelector(".day--list");
  // console.log(theDayList);  
  globalThis.theDayContent = document.querySelector(".day--content");

  // const dayList = document.createElement("div");
  // const dayContent = document.createElement("div");
  // theDay.appendChild(dayList);
  // theDay.appendChild(dayContent);

  console.log(newDate);
  const newDateFormat = newDate
    .toLocaleDateString("pt-br")
    .split("/")
    .reverse()
    .join("-");
  // const newDateFormat = newDate.toISOString().split('T')[0];
  console.log(newDateFormat);

  let obj;
  fetch("calendarDB.json")
    .then(res => res.json())
    .then(data => obj = data)
    // .then((data) => (obj = data))
    .then(() => {
      console.log(obj);
      console.log(obj[newDateFormat]);
      let day = "";

      for (const [key, value] of Object.entries(obj[newDateFormat])) {
        console.log(ID);
        console.log(JSON.stringify(value["링크"]).replace(/['"]+/g,''));
        if (ID === JSON.stringify(value["링크"]).replace(/['"]+/g,'')) {
          day += `<div class="day list selected2" id=${JSON.stringify(value["링크"])}>
          ${key}<div class="day elm">${JSON.stringify(value["내용"]).replace(/["]+/g, "")}
        </div></div><br>`;
          console.log('T');
        } else {
          day += `<div class="day list" id=${JSON.stringify(value["링크"])}>
          ${key}<div class="day elm">${JSON.stringify(value["내용"]).replace(/["]+/g, "")}
        </div></div><br>`;
        console.log('F');
        };
      };

        

      // if (
      //   newDate.getDate() === new Date().getDate() &&
      //   newDate.getMonth() === new Date().getMonth() &&
      //   newDate.getFullYear() === new Date().getFullYear()
      // ) {
      //   for (const [key, value] of Object.entries(obj[newDateFormat])) {
      //     day += `<div class="day list" id=${JSON.stringify(value["링크"])}>
      //       ${key}<div class="day elm">${JSON.stringify(value["내용"]).replace(/["]+/g, "")}
      //     </div></div><br>`;
      //   }

      //   // day += `<div class="day today">${JSON.stringify(
      //   //   obj[newDateFormat]
      //   // )}</div>`;
      // } else {
      //   // day += `<div class="day">${JSON.stringify(Object.keys(obj[newDateFormat])[1]).replace(
      //   //   /["]+/g,
      //   //   ""
      //   // )}</div>`;

      //   for (const [key, value] of Object.entries(obj[newDateFormat])) {
      //     day += `<div class="day list" id=${JSON.stringify(value["링크"])}>
      //       ${key}<div class="day elm">${JSON.stringify(value["내용"]).replace(/["]+/g, "")}
      //     </div></div><br>`;
      //   }
      // }
      theDayList.innerHTML = day;

      const theDayListIn = document.querySelectorAll(".day.list");
      theDayListIn.forEach(item => {
        item.classList.remove('selected');
      });
      console.log(theDayListIn);
      theDayListIn.forEach((item) => {
        item.addEventListener("click", () => {
          // console.log(item.id);
          theDayListIn.forEach(item => {
            item.classList.remove('selected2');
          });
          console.log(item.id[4]);
          if (item.id[4] === 's') {
            theDayListIn.forEach(item => {
              item.classList.remove('selected');
            });
            item.classList.add('selected')
            showRight(item.id);
          } else {
            item.id = item.id.replace('http', 'https');
            console.log(item.id);
            theDayListIn.forEach(item => {
              item.classList.remove('selected');
            });
            item.classList.add('selected')

            showRight(item.id);
          }
        });
      });
    });
  // showRight();
};

function showRight(link) {
  const theDayContentIn = `<object type="text/html" data=${link} width="1000px" height="680px" style="overflow:auto;border:5px ridge blue"></object>`;
  globalThis.theDayContent.innerHTML = theDayContentIn;
};

// function insertAfter(newNode, referenceNode) {
//   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }


// make week calendar
function makeWeekCalendar(newDate) {
  
  const weekDays = document.querySelector(".weekdays");
  
  const weekList = document.querySelector(".days") === null ?  document.querySelector(".week") : document.querySelector(".days")

  try {
    weekList.classList.remove('days');
    weekList.classList.add('week');
  } catch {
    
  }

  console.log(weekList);
  // weekList.classList.add('week');
  
  // const weekDays = document.querySelector(".weekdays");
  // const weekList = document.querySelector(".days");
  // let weekBack = '<div class="week"></div>'
  
  // try {
  //   weekList.classList.remove('days');
  //   weekList.classList.add('week');
  //   console.log('A')
  // } catch {
  //   document.querySelector(".day--case").className = "weekdays";
  //   document.querySelector(".day--list").remove();
  //   document.querySelector(".day--content").remove();
  // };
  
  const firstDayWeek = newDate.getDate() - newDate.getDay();
  const dayWeek = ['일', '월', '화', '수', '목', '금', '토']

  let days = "";
      for (let i = 0; i < 7; i++) {
        if (
          firstDayWeek + i === new Date().getDate() &&
          newDate.getMonth() === new Date().getMonth() &&
          newDate.getFullYear() === new Date().getFullYear()
        ) {
          days += `<div class="week--day today">${
            firstDayWeek + i
          } (${dayWeek[i]})</div>`;
        } else {
          days += `<div class="week--day">${
            firstDayWeek + i
          } (${dayWeek[i]})</div>`;
        }};
  console.log(days);
  weekDays.innerHTML = days;
  console.log(weekDays);

  let obj;
  fetch("calendarDB.json")
    .then(res => res.json())
    .then(data => obj = data)
    // .then((data) => (obj = data))
    .then(() => {
      console.log(obj);
      // console.log(obj[newDateFormat]);

      let weekDaysList = "";
      for (let i = 0; i < 7; i++) {
        try {
          const newDateFormat = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - newDate.getDay() + i)
            .toLocaleDateString("pt-br")
            .split("/")
            .reverse()
            .join("-");

          // console.log(obj[newDateFormat]);

          // 이 부분이 상당히 어려웠음. if와 for이 결합되어서 굉장히 오묘한 영역을 커버하게 됨 / 사실 지금도 이해가 잘 안 됨
          
          // weekDaysList += `<div class="week--day--list">`;
          //   for (const [key, value] of Object.entries(obj[newDateFormat])) {
          //     weekDaysList += `<div class="elm" data-date=${newDateFormat} id=${JSON.stringify(value["링크"])}>${key}</div>`;
          //   }
          // weekDaysList += `</div>`;
          
          if (Object.keys(obj[newDateFormat]).length == 1) {
            for (const [key, value] of Object.entries(obj[newDateFormat])) {
              weekDaysList += `<div class="week--day--list">`;
              for (const [key, value] of Object.entries(obj[newDateFormat])) {
                weekDaysList += `<div class="elm" data-date=${newDateFormat} id=${JSON.stringify(value["링크"])}>${key}</div>`;
              }
              weekDaysList += `</div>`;
            }
          } else {
            weekDaysList += `<div class="week--day--list">`;
            for (const [key, value] of Object.entries(obj[newDateFormat])) {
              weekDaysList += `<div class="elm" data-date=${newDateFormat} id=${JSON.stringify(value["링크"])}>${key}</div>`;
            }
            weekDaysList += `</div>`;
          }



        } catch {
          weekDaysList += `<div class="week--day--list"></div>`;
        }
        
      }
      console.log(weekList);
      weekList.innerHTML = weekDaysList;

      const weekListAll = document.querySelectorAll('.elm');
      weekListAll.forEach((item) => {
        item.addEventListener("click", () => {
          monthBtn.classList.remove('active');
          weekBtn.classList.remove('active');
          dayBtn.classList.add('active');
          weekList.classList.remove('week');
          weekList.classList.add('days');
          makeDayCalendar(new Date(item.dataset.date), item.id);
          // theDayListIn.forEach(item => {
          //   item.classList.remove('selected');
          // });
          // item.classList.add('selected')
          showRight(item.id);
        });
      });
  });
};

function makeMonthCalendarEx() {
  location.reload(true);
  location.href = location.href;
  history.go(0);
  // makeMonthCalendar(newDate);
}



// function makeMonthCalendar(newDate) {
  
//   // Window.this.load(document.url('https://jmkeyn92.github.io/stock-calendar/'));
//   const monthDays = document.querySelector(".days");
//   const monthDaysList = document.querySelector("month-day-list");
//   const lastDay = new Date(
//     newDate.getFullYear(),
//     newDate.getMonth() + 1,
//     0
//   ).getDate();
//   const prevLastDay = new Date(
//     newDate.getFullYear(),
//     newDate.getMonth(),
//     0
//   ).getDate();

//   document.querySelector(".date h1").innerHTML = months[newDate.getMonth()];
//   document.querySelector(".date p").innerHTML = newDate.toDateString();

//   newDate.setDate(1);
//   const firstDayIndex = newDate.getDay();
//   newDate.setDate(lastDay);
//   const lastDayIndex = newDate.getDay();

//   newDate.setDate(1);

//   let obj;
//   fetch("calendarDB.json")
//     .then(res => res.json())
//     .then(data => obj = data)
//     .then(() => {
//       // console.log(obewDateFormat]);

//       let days = "";
//       for (let x = firstDayIndex; x > 0; x--) {
//         try {
//           const newDateFormat = new Date(newDate.getFullYear(), newDate.getMonth(), prevLastDay - x + 1)
//             .toLocaleDateString("pt-br")
//             .split("/")
//             .reverse()
//             .join("-");

//           console.log(x);
//           console.log(newDateFormat);

//           // 이 부분이 상당히 어려웠음. if와 for이 결합되어서 굉장히 오묘한 영역을 커버하게 됨 / 사실 지금도 이해가 잘 안 됨
//           if (Object.keys(obj[newDateFormat]).length == 1) {
//             for (const [key, value] of Object.entries(obj[newDateFormat])) {
//               days += `<div class='prev-date daytemp ${prevLastDay - x + 1}'>${
//                 prevLastDay - x + 1
//               }</div>`;
//               for (const [key, value] of Object.entries(obj[newDateFormat])) {
//                 days += `<div class="elm" data-date=${newDateFormat} id=${JSON.stringify(value["링크"])}>${key}</div>`;
//               }
//               days += `</div>`;
//             }
//           } else {
//             days += `<div class='prev-date daytemp ${prevLastDay - x + 1}'>${
//               prevLastDay - x + 1
//             }</div>`;
//             for (const [key, value] of Object.entries(obj[newDateFormat])) {
//               days += `<div class="elm" data-date=${newDateFormat} id=${JSON.stringify(value["링크"])}>${key}</div>`;
//             }
//             days += `</div>`;
//           }
//         } catch {
//           days += `<div class='prev-date daytemp ${prevLastDay - x + 1}'>${
//             prevLastDay - x + 1
//           }<div class="month--day--list">1</div></div>`;
//         }
//       }

//       for (let x = 1; x <= lastDay; x++) {
//         try {
//           const newDateFormat = new Date(newDate.getFullYear(), newDate.getMonth(), x)
//             .toLocaleDateString("pt-br")
//             .split("/")
//             .reverse()
//             .join("-");

//           console.log(x);
//           console.log(newDateFormat);

//           // here

//           // 이 부분이 상당히 어려웠음. if와 for이 결합되어서 굉장히 오묘한 영역을 커버하게 됨 / 사실 지금도 이해가 잘 안 됨
//           if (Object.keys(obj[newDateFormat]).length == 1) {
//             for (const [key, value] of Object.entries(obj[newDateFormat])) {
//               days += `<div class='daytemp ${x}'>${x}</div>`;
//               for (const [key, value] of Object.entries(obj[newDateFormat])) {
//                 days += `<div class="elm" data-date=${newDateFormat} id=${JSON.stringify(value["링크"])}>${key}</div>`;
//               }
//               days += `</div>`;
//             }
//           } else {
//             days += `<div class='prev-date daytemp ${prevLastDay - x + 1}'>${
//               prevLastDay - x + 1
//             }</div>`;
//             for (const [key, value] of Object.entries(obj[newDateFormat])) {
//               days += `<div class="elm" data-date=${newDateFormat} id=${JSON.stringify(value["링크"])}>${key}</div>`;
//             }
//             days += `</div>`;
//           }
//         } catch {
//           days += `<div class='prev-date daytemp ${prevLastDay - x + 1}'>${
//             prevLastDay - x + 1
//           }<div class="month--day--list">1</div></div>`;
//         }
//       }


//       console.log(days);
      
//       monthDays.innerHTML = days;

//       // const weekListAll = document.querySelectorAll('.elm');
//       // weekListAll.forEach((item) => {
//       //   item.addEventListener("click", () => {
//       //     monthBtn.classList.remove('active');
//       //     weekBtn.classList.remove('active');
//       //     dayBtn.classList.add('active');
//       //     weekList.classList.remove('week');
//       //     weekList.classList.add('days');
//       //     makeDayCalendar(new Date(item.dataset.date), item.id);
//       //     // theDayListIn.forEach(item => {
//       //     //   item.classList.remove('selected');
//       //     // });
//       //     // item.classList.add('selected')
//       //     showRight(item.id);
//       //   });
//       // });
//   });



//   // let days = "";

//   // for (let x = firstDayIndex; x > 0; x--) {
//   //   days += `<div class='prev-date daytemp ${prevLastDay - x + 1}'>${
//   //     prevLastDay - x + 1
//   //   }<div class="month--day--list">1</div></div>`;
//   // }

//   // for (let i = 1; i <= lastDay; i++) {
//   //   if (
//   //     i === new Date().getDate() &&
//   //     newDate.getMonth() === new Date().getMonth() &&
//   //     newDate.getFullYear() === new Date().getFullYear()
//   //   ) {
//   //     days += `<div class="today daytemp ${i}">${i}<div class="month--day--list">1</div></div>`;
//   //   } else {
//   //     days += `<div class="daytemp ${i}">${i}<div class="month--day--list">1</div></div>`;
//   //   }
//   // }

//   // for (let y = 1; y <= 42 - firstDayIndex - lastDay; y++) {
//   //   days += `<div class="next-date daytemp ${y}">${y}<div class="month--day--list">1</div></div>`;
//   // }

//   // monthDays.innerHTML = days;


//   newDate.setDate(new Date().getDate());
//   dayclickListener();
// }



function makeMonthCalendar(newDate) {
  
  // Window.this.load(document.url('https://jmkeyn92.github.io/stock-calendar/'));
  const monthDays = document.querySelector(".days");
  const monthDaysList = document.querySelector("month-day-list");
  const lastDay = new Date(
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    newDate.getFullYear(),
    newDate.getMonth(),
    0
  ).getDate();

  document.querySelector(".date h1").innerHTML = months[newDate.getMonth()];
  document.querySelector(".date p").innerHTML = newDate.toDateString();

  newDate.setDate(1);
  const firstDayIndex = newDate.getDay();
  newDate.setDate(lastDay);
  const lastDayIndex = newDate.getDay();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class='prev-date daytemp ${prevLastDay - x + 1}'>${
      prevLastDay - x + 1
    }<div class="month--day--list">1</div></div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      newDate.getMonth() === new Date().getMonth() &&
      newDate.getFullYear() === new Date().getFullYear()
    ) {
      days += `<div class="today daytemp ${i}">${i}<div class="month--day--list">1</div></div>`;
    } else {
      days += `<div class="daytemp ${i}">${i}<div class="month--day--list">1</div></div>`;
    }
  }

  for (let y = 1; y <= 42 - firstDayIndex - lastDay; y++) {
    days += `<div class="next-date daytemp ${y}">${y}<div class="month--day--list">1</div></div>`;
  }

  monthDays.innerHTML = days;

  
  newDate.setDate(new Date().getDate());
  dayclickListener();
}
