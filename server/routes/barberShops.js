const express = require("express");
const BarberShop = require("../models/BarberShop");
const { isLoggedIn } = require("../middlewares");
const Cloudinary = require("../configs/cloudinary");

const router = express.Router();

// Route to create a BarberShop
router.post("/barbershop",
  Cloudinary.single("picture"),
  isLoggedIn,
  (req, res, next) => {
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
    let logo = req.file && req.file.url;
    BarberShop.create({
      _owner,
      name,
      gender,
      address: {
        streetAddress,
        city,
        country,
        location: {
          coordinates: [lat, lng]
        }
      },
      workingHours: {
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
  }
);

// Route to get all Barber Shops
router.get("/barbershop", (req, res, next) => {
  BarberShop.find()
    .then(barbershop => {
      res.json(barbershop);
    })
    .catch(err => next(err));
});

// Route to get a Barber Shop by it's Id
router.get("/barbershop/:barbershopId", (req, res, next) => {
  BarberShop.findById(req.params.barbershopId)
    .then(barbershop => {
      if (barbershop) {
        res.json(barbershop);
      } else {
        next({
          status: 400,
          message:
            "There is no Barber Shop with the id: " + req.params.barbershopId
        });
      }
    })
    .catch(err => next(err));
});

//Route to delete a Barber Shop
router.delete("/barbershop/:barbershopId", isLoggedIn, (req, res, next) => {
  BarberShop.findById(req.params.barbershopId)
    .then(barbershop => {
      if (req.user._id.equals(barbershop._owner)) {
        BarberShop.findOneAndRemove(req.params._id).then(barbershop => {
          res.json({
            success: true
          });
        });
      } else {
        next({
          status: 403,
          message: "User cannot this Barber Shop"
        });
      }
    })
    .catch(err => next(err));
});

module.exports = router;
