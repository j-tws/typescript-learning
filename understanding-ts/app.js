console.log('loaded!');
// Core Types
// number : 1, 5.3, -10        // All numbers, no differentiation between integers or floats
// string : 'Hi', "Hi", `Hi`   // All text values
// boolean: true, false        // Just these two, no "truthy" or "falsy" values
function add(n1, n2, showResult, phrase) {
    // NO. Can be solved with typescript
    // if (typeof n1 !== 'number' || typeof n2 !== 'number'){
    //   throw new Error('Incorrect input!')
    // }
    var result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return n1 + n2;
    }
}
var number1 = 5;
var number2 = 2.5;
var printResult = true;
var resultPhrase = 'Result is: ';
var result = add(number1, number2, printResult, resultPhrase);
console.log(result);
