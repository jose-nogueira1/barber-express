const express = require("express");
const BarberShop = require("../models/barberShop");
const { isLoggedIn } = require("../middlewares");
const Cloudinary = require("../configs/cloudinary");

const router = express.Router();

// Route to create a BarberShop
router.post("/barbershops", Cloudinary.single("picture"), isLoggedIn, (req, res, next) => {
  let {
    name,
    gender,
    streetAddress,
    city,
    country,
    lat,
    lng,
    workingHourMonBegin,
    workingHourMonEnd,
    workingHourTueBegin,
    workingHourTueEnd,
    workingHourWedBegin,
    workingHourWedEnd,
    workingHourThuBegin,
    workingHourThuEnd,
    workingHourFriBegin,
    workingHourFriEnd,
    workingHourSatBegin,
    workingHourSatEnd,
    workingHourSunBegin,
    workingHourSunEnd
  } = req.body;
  let _owner = req.user._id;
  let logo = req.file.url;
  BarberShop.create({
    _owner,
    name,
    gender,
    address: {
      streetAddress,
      city,
      country,
      location: {
        coordinates: [ lat, lng ]
      },
    },
    workingHours:{
      workingHourMonBegin,
      workingHourMonEnd,
      workingHourTueBegin,
      workingHourTueEnd,
      workingHourWedBegin,
      workingHourWedEnd,
      workingHourThuBegin,
      workingHourThuEnd,
      workingHourFriBegin,
      workingHourFriEnd,
      workingHourSatBegin,
      workingHourSatEnd,
      workingHourSunBegin,
      workingHourSunEnd
    },
    logo
  })
    .then(barbershop => {
      res.json({
        success: true,
        barbershop
      });
    })
    .catch(err => next(err));
});


module.exports = router;
