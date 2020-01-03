const mongoose = require('mongoose');
const { Schema } = mongoose;


//can freely add or subtract propetries as needed 
const userSchema = new Schema({
  googleID: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);
