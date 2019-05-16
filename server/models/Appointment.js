const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const appointmentSchema = new Schema({

  _customer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  _barberShop: {
    type: Schema.Types.ObjectId,
    ref: "BarberShop"
  },
  date: Date, // Example: "2019-05-16"
  hourAndMinutes: Number,  // Example for 9:45 => 9*60+45 = 585
  },{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
