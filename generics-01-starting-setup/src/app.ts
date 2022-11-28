// Code goes here!
// Built in generics
// const names: Array<string> = []; // exactly the same as string[]
// // names[0].split(' ')

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done!')
//   },2000)
// })

// promise.then( data => {
//   data.split(' ')
// })

// Working with constraints
function merge<T extends object, U extends object>(objA: T, objB: U){
  return Object.assign(objA, objB)
}

const mergedObj = merge({name: 'Max', hobbies: ['sports']}, {age: 30})
console.log(mergedObj.age)

interface Lengthy {

}

// Another generic function

interface Lengthy {
  length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string]{
  let descriptionText = 'Got no value.'
  if (element.length === 1){
    descriptionText = `Got 1 element`
  } else if (element.length > 1){ 
    descriptionText = `Got ${element.length} elements`
  }

  return [element, descriptionText]
}

console.log(countAndDescribe("hello"))

// keyof
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T, 
  key: U
){
  return `Value: ${obj[key]}`
}

console.log(extractAndConvert({name: 'Max'}, 'name'));

// generic classes

class DataStorage<T extends string | boolean | number> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T){
    if (this.data.indexOf(item) === -1){
      return
    }
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems(){
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Max')
textStorage.addItem('Manu')
textStorage.removeItem('Manu')
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>()

// const objStorage = new DataStorage<object>()
// const maxObj = {name: 'Max'}
// objStorage.addItem(maxObj)
// objStorage.addItem({name: 'Manu'})
// // ...
// objStorage.removeItem(maxObj)
// console.log(objStorage.getItems());

// General utility types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string, 
  description: string, 
  date: Date
  ): CourseGoal{
  // return {title: title, description: description, completeUntil: Date}
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date
  return courseGoal as CourseGoal
} 

// readonly types - can only read, not changing properties / value
const names: Readonly<string[]> = ['Max', 'Anna']
// names.push('Manu')
// names.pop()