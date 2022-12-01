// type AddFn = (a: number, b: number) => number
// interfaces can be used for function as well
interface AddFn{
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2
}

interface Named {
  readonly name?: string;
  // optional property
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string){
    if (n){
      this.name = n
    }
  }

  greet(phrase: string): void {
    if (this.name){
      console.log(`${phrase} ${this.name}`)
    } else {
      console.log(`hi!`)
    }
  }
}

let user1: Greetable;

user1 = new Person()

user1.greet('Hi there - I am')
console.log(user1);
