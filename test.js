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

// var x = 'global';
// function foo() {
//   console.log(x);
//   var x = 'local';
// };

// foo();
// console.log(x);

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     let _age = age;
//   }
//   sayHi() {
//     console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
//   };
//   };


// const me = new Person('Kim', 43);
// console.log(me.name);
// console.log(me._age);


// var funcs = [];
// for (var i = 0; i < 3; i++) {
//   funcs[i] = function() { return i; };
// };
// for (var j = 0; j < funcs.length; j++) {
//   console.log(funcs[j]());
// };

// console.log(funcs[0]);

// const arrow = () => x;

// const fruits = [1, 2, 3];
// // length = 3;
// // Array.from({length}, (_, i) => i);

// const average = fruits.reduce((acc, cur, i, { length }) => {
//   return i === length - 1 ? (acc + cur) / length : acc + cur;
// }, 0);
// console.log(average);
// console.log(fruits);

// const max = Math.max(fruits);
// console.log(max);

// console.log(Number.MIN_VALUE-Number.EPSILON>0);
const regExp = /is/g;
const target = 'he is is a boy';
console.log(target.match(regExp));


// var arr = [1, 2, 3];
// const max = Math.max.call(null, arr);
// console.log(max);

console.log(1 == '1');

