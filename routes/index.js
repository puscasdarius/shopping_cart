var express = require('express');
var router = express.Router();
var User = require('../models/user');
var funcs = require('../models/utility');
//CSRF este folosit pentru a asigura protectia utilizatorului

//1.importez modelul obiectului
var Product = require('../models/products');
/* GET home page. */
router.get('/', function(req, res, next) {
  //2.Extrag toate inregistrarile din baza de date
  var products = Product.find(function(err,docs){
    if(err) throw err;
    var chunkSize = 3;
    var chunks = [];
    for(var i = 0;i<docs.length;i+=chunkSize){
      chunks.push(docs.slice(i,i+chunkSize));
      console.log(docs[i]);
    }
    //3.Trimit datele spre view
    res.render('index', { title: 'Express',products:chunks});
  });
});


//Sign In
router.get('/user/signin',function(req,res,next){
  res.render('user/signin');
})
router.post('/user/signin',funcs.verifyUser);

//Sign Up
router.get('/user/signup',function(req,res,next){
  res.render('user/signup');
})
router.post('/user/signup',funcs.registerUser);
//Show Products
router.get('/show_products',funcs.showProducts);
//Add Products
router.get('/add_products',function(req,res,next){
  res.render('functions/add_products');
})
router.post('/add_products',funcs.addProducts);

router.get('/remove_products',function(req,res,next){
  res.render('functions/remove_products');
})
router.get('/edit_products',function(req,res,next){
  res.render('functions/edit_products');
})
router.get('/view_product/:product_id',funcs.getProductDetails);


function validateUser(name,password){
  User.find(function(err,docs){
    for(var i=0;i<docs.length;i++){
      if(docs[i].name == name && docs[i].password == password){
        return -1;
      }
    }
    return 0;
  });
}



module.exports = router;
