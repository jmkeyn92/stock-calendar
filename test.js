'use strict';

// console.log('a')

// const arr = [1, 2, 3];
// arr.forEach(console.log); 


// let score = 80;
// console.log(score);
// // score = 80;

// console.log(score);

// console.log('hello');

// function countdown(n) {
//   if (n<0) return;
//   console.log(n);
//   countdown(n-1);
// };

// countdown(10);

// function foo() {
//   console.log('global function foo');
// };

// function bar() {
//   function foo() {
//     console.log('local function foo');
//   }
//   foo();
// };

// bar();

var x = 'global';
function foo() {
  console.log(x);
  var x = 'local';
};

foo();
console.log(x);