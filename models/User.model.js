const mongoose = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema =  mongoose.Schema({
  email: {
    type: String,
    required: [ true, "email is required"],
    unique: true,
    lowercase: true
  },
  username: {
    type: String,
  },
  passwordHash: {
   String,
  type: String, 
  required: [true, "password is required"]
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId, //hace referencia a otra
    ref:"Post"
  }]
  
},{
  timeStamps:true //agrega en el objeto la fecha de cuando fue creado

});

const User = mongoose.model("User", userSchema);

//EPORTACION
module.exports = User;
