// const userName = 'Max'
// let age = 30

// console.log(userName)

const button = document.querySelector('button')!

function add(n1: number, n2: number){
  if (n1 + n2 > 0){
    return n1 + n2
  }
}

function clickHandler(message: string){
  console.log('clicked!' + message)
}

// strict bind call apply
if (button){
  button.addEventListener('click', clickHandler.bind(null, "You're welcome!"))
}
