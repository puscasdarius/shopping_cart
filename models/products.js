var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema este un fel de interfata pentru datele ce se introduc in tabele
// Schema pentru un tabel ce contine obiecte de tip product
var schema = new Schema({
  name:{type:String,required:true},
  description:{type:String,required:true},
  price:{type:String,required:true},
  imagePath:{type:String,required:true}
});

//Schema este exportata, pentru a putea fi folosita in proiect
//din aceasta schema se creeaza modele de tipuri de date
module.exports = mongoose.model('Product',schema);
