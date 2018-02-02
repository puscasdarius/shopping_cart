var User = require('./user');
var Product = require('./products');

module.exports = {
  verifyUser:function (req,res,next){
    if(req.body.inputEmail.length == 0 && req.body.inputPassword.length == 0){
      res.render('user/signin',{fillFields:"Please fill all fields!"});
    }else{
      User.find(function(err,docs){
        var ok = false;
        var user = null;
        if(err) throw err;
        for(var i = 0;i<docs.length;i++){
          if(req.body.inputEmail == docs[i].email && req.body.inputPassword == docs[i].password){
            ok = true;
            user = docs[i];
          }
        }
        if(ok){
          res.send('partials/header',{name:user.name});
          //res.redirect('/');
        }else{
          res.render('user/signin',{invalidUser:"Your account is not registered!"});
        }
      });
    }
  },
  registerUser:function(req,res,next){
    if(req.body.inputName.length == 0 || req.body.inputAdress.length == 0 ||
      req.body.inputPhone.length == 0 || req.body.inputEmail.length == 0 ||
      req.body.inputPassword.length == 0 ){
          res.render('user/signup',{warning:true});
      }else{
            var user = new User({
              name:req.body.inputName,
              address:req.body.inputAdress,
              phone_number:req.body.inputPhone,
              email:req.body.inputEmail,
              password:req.body.inputPassword
            });
            user.save(function(err){
              if(err)throw err;
              res.redirect('/');
            });
      }
  },
  showProducts:function(req,res,next){
    Product.find(function(err,docs){
      if(err) throw err;
      res.render('functions/show_products',{products:docs});
    })
  },
  addProducts:function(req,res,next){
    if(req.body.product_name.length == 0 ||  req.body.product_des.length == 0 ||
     req.body.product_price.length == 0 || req.body.product_imagePath.length == 0){
      res.render('functions/add_products',{warning:"Please fill all fields!"});
    }else{
      var user = new Product({
        name:req.body.product_name,
        description:req.body.product_des,
        price:req.body.product_price,
        imagePath:'/images/'+req.body.product_imagePath
      });
      user.save(function(err){
        if(err)throw err;
      });
      res.redirect('/');
    }
  },
  getProductDetails:function(req,res,next){
    var id = req.params.product_id;
    Product.find(function(err,docs){
      if(err) throw err;
      for(var i=0;i<docs.length;i++){
        if(id == docs[i].id){
          console.log(docs[i]);
          res.render('product/product_view',{product_details:docs[i]});
        }
      }
    });
  }
};
