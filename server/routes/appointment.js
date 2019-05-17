const express = require("express");
const Appointment = require("../models/Appointment");
const { isLoggedIn } = require("../middlewares");
const BarberShop = require("../models/BarberShop")

const router = express.Router();

// Create an appointment
router.post("/appointment", isLoggedIn, (req, res, next) => {
  let { _barberShop, date, hourAndMinutes } = req.body;
  let _customer = req.user._id;
  Appointment.create({ _barberShop, date, hourAndMinutes, _customer })
    .then(appointment => {
      res.json({
        success: true,
        appointment
      });
    })
    .catch(err => next(err));
  // Bonus: make sure there is a free spot at that time
});

// Route to get all appointments
router.get("/appointment", (req, res, next) => {
  Appointment.find()
    .then(appointment => {
      res.json(appointment);
    })
    .catch(err => next(err));
});

// Route to get a Appointment by it's Id
router.get("/appointment/:appointmentId", (req, res, next) => {
  Appointment.findById(req.params.appointmentId)
    .then(appointment => {
      if (appointment) {
        res.json(appointment);
      } else {
        next({
          status: 400,
          message:
            "There is no Barber Shop with the id: " + req.params.appointmentId
        });
      }
    })
    .catch(err => next(err));
});

// Route to delete an appointment
router.delete("/appointments/:appointmentId", isLoggedIn, (req, res, next) => {
  Appointment.findById(req.params.appointmentId)
    .then(appointment => {
      if (req.user._id.equals(appointment._customer)) {
        Appointment.findByIdAndDelete(appointment._id) 
          .then( appointment => {
            res.json({
              success: true
            });
          })
      } else {
        next({
          status: 403,
          message: "User cannot delete other user appointment"
        });
      }
    })
    .catch(err => next(err));
});

// Route to get all available appointment, on a specific date and a specific barber shop
// Example input: GET /api/available-times (_barberShop="12345679abcdef", date="2019-05-16")
// Example output: [
//  {numbersAndMinute: 540, status: "Available"},
//  {numbersAndMinute: 585, status: "Unavailable"},
//  {numbersAndMinute: 630, status: "Unavailable"},
// ]
router.get("/available-times/:barbershopId", (req, res, next) => {
  let { _barberShop, date } = req.body;
  let _id = req.params.barbershopId;
  BarberShop.findById({_id})
    .then(barbershop => {
      Appointment.find({_barberShop:_id})
      .then(appointments => {
        res.json({
          success: true,
          workingHours
        })
      })
    })
    .catch(err => next(err))
});
  
module.exports = router;
