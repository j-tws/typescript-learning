import _ from 'lodash'
import "reflect-metadata"
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { Product } from './product.model'


// declare var GLOBAL: any;
// console.log(GLOBAL)
// console.log(_.shuffle([1, 2, 3]));

const products = [
  {title: 'carpet', price: 30}, 
  {title: 'book', price: 12}
]

const newProd = new Product('', -5)
validate(newProd).then(errors => {
  if (errors.length > 0){
    console.log('VALIDATION ERRORS!');
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
})

// const p1 = new Product('Book', 10)

// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price)
// })

const loadedProducts = plainToClass(Product, products)

for (const prod of loadedProducts){
  console.log(prod.getInformation())
}