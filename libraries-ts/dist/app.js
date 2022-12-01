"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const product_model_1 = require("./product.model");
const products = [
    { title: 'carpet', price: 30 },
    { title: 'book', price: 12 }
];
const loadedProducts = (0, class_transformer_1.plainToClass)(product_model_1.Product, products);
for (const prod of loadedProducts) {
    console.log(prod.getInformation());
}
//# sourceMappingURL=app.js.map