'use strict';

// console.log('a')

// const arr = [1, 2, 3];
// arr.forEach(console.log); 


// let score = 80;
// console.log(score);
// // score = 80;

// console.log(score);

console.log('hello');

function countdown(n) {
  if (n<0) return;
  console.log(n);
  countdown(n-1);
};

countdown(10);