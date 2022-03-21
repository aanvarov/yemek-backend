const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arr2 = ['1', '2', '3'];

function summing(arr) {
  let sum = 0;
  arr.map((num, i) => {
    sum = sum + parseInt(num);
  });
  return sum;
}
let sum2 = 0;
arr.forEach((num, i, original) => {
  sum2 = sum2 + num;
});

const obj = {
  name: 'abror',
  greeting() {
    console.log(`Hi ${this.name}`);
  },
};

const objFunc = obj.greeting.bind(obj);

objFunc();

const summa = arr2.reduce((prev, curr) => parseInt(prev) + parseInt(curr));

console.log(sum2);
