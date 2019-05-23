const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:{
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  _barberShop: {
    type: Schema.Types.ObjectId,
    ref: "BarberShop"
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
