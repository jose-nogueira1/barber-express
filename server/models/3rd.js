const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thirdSchema = new Schema({

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Third = mongoose.model('Third', thirdSchema);
module.exports = Third;
