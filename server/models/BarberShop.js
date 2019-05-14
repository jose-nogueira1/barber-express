const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let workingHourSchema =  {
  begin: {
    type: String,
    match: /[0-9]{2}:[0-9]{2}/
  },
  end: {
    type: String,
    match: /[0-9]{2}:[0-9]{2}/
  },
}

const barberShopSchema = new Schema(
  {
    _owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    address: {
      street_address: String,
      city: String,
      country: String,
      location: {
        type: { type: String, default: "Point" },
        coordinates: [Number]
      }
    },
    workingHours: {
      mon: workingHourSchema,
      tue: workingHourSchema,
      wed: workingHourSchema,
      thu: workingHourSchema,
      fri: workingHourSchema,
      sat: workingHourSchema,
      sun: workingHourSchema,
    },
    gender: {
      enum: ["MALE", "FEMALE", "UNISEX"]
    },
    logo: String
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
