const mongoose = require('mongoose');
const { Schema } = mongoose;


//can freely add or subtract propetries as needed 
const userSchema = new Schema({
  googleID: String
});

mongoose.model('users', userSchema);
