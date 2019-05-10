const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username:{
    type: String,
    unique: true,
    required: true,
    maxlength: 30,
    minlength: 10
  },
  password: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 10
  },
  name: String,
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
