// Code goes here!

// const userName = 'max'
// let age = 30
// age = 29

// function add(a: number, b: number){
//   let result
//   result = a + b
//   return result
// }

// if (age > 20){
//   let isOld = true
// }

// console.log(isOld)

// console.log(result)

// const add: (a: number, b: number) => number = (num1, num2) => num1 + num2

// const add = (a: number, b: number = 2) => a + b

// console.log(add(2, 5))

// const printOutput: (a: number | string) => void = output => console.log(output)

// const button = document.querySelector('button')

// if (button){
//   button.addEventListener('click', event => console.log(event))
// }



// printOutput(add(5))

const hobbies = ['Sports', 'Cooking']
const activeHobbies = ['Hiking']

activeHobbies.push(...hobbies)

const person = {
  firstName: 'max',
  age: 30
}

const copiedPerson = { ...person }

const add = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue
  }, 0)
}

const addNumbers = add(5, 10, 2, 3.6)
console.log(addNumbers)

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

const { firstName: userName, age } = person;
console.log(userName, age)
