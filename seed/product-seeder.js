var mongoose = require('mongoose');
var Product = require('../models/products');

var link = "mongodb://root:root@ds123695.mlab.com:23695/phone";
mongoose.connect(link);

var products = [
  new Product({
    imagePath:'/images/cart.png',
    description:'Jmecher',
    price:20
  }),
  new Product({
    imagePath:'/images/cart.png',
    description:'Jmecher',
    price:20
  }),
  new Product({
    imagePath:'/images/cart.png',
    description:'Jmecher',
    price:20
  }),
  new Product({
    imagePath:'/images/cart.png',
    description:'Jmecher',
    price:20
  }),new Product({
    imagePath:'/images/cart.png',
    description:'Jmecher',
    price:20
  }),new Product({
    imagePath:'/images/cart.png',
    description:'Jmecher',
    price:20
  })
];

var done = 0;

for(var i=0;i<products.length;i++){
  products[i].save(function(err){
    if(err) throw err;
    done++;
    if(done === products.length){
      exit();
    }
  });
}

function exit(){
  mongoose.disconnect();
}
