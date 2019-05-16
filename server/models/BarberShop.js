const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const barberShopSchema = new Schema({
    
    _owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    address: {
      streetAddress: String,
      city: String,
      country: String,
      location: {
        type: { type: String, default: "Point" },
        coordinates: [Number]
      },
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "UNISEX"],
      required: true
    },
    workingHours: {
      workingHourMonBegin: { type: Number },
      workingHourMonEnd: { type: Number },
      workingHourTueBegin: { type: Number },
      workingHourTueEnd: { type: Number },
      workingHourWedBegin: { type: Number },
      workingHourWedEnd: { type: Number },
      workingHourThuBegin: { type: Number },
      workingHourThuEnd: { type: Number },
      workingHourFriBegin: { type: Number },
      workingHourFriEnd: { type: Number },
      workingHourSatBegin: { type: Number },
      workingHourSatEnd: { type: Number },
      workingHourSunBegin: { type: Number },
      workingHourSunEnd: { type: Number },
    },
    logo:{
      type: String,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const barberShop = mongoose.model("BarberShop", barberShopSchema);
module.exports = barberShop;
