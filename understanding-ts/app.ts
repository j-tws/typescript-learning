console.log('loaded!')
 // Core Types
 // number : 1, 5.3, -10        // All numbers, no differentiation between integers or floats
 // string : 'Hi', "Hi", `Hi`   // All text values
 // boolean: true, false        // Just these two, no "truthy" or "falsy" values

function add(n1: number, n2: number, showResult: boolean, phrase: string){
  // NO. Can be solved with typescript
  // if (typeof n1 !== 'number' || typeof n2 !== 'number'){
  //   throw new Error('Incorrect input!')
  // }
  const result = n1 + n2
  if (showResult){
    console.log(phrase + result)
  } else {
    return n1 + n2
  }
}

const number1 = 5
const number2 = 2.5
const printResult = true
const resultPhrase = 'Result is: '

const result = add(number1, number2, printResult, resultPhrase)
console.log(result);

