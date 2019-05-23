const express = require("express");
const Appointment = require("../models/Appointment");
const { isLoggedIn } = require("../middlewares");
const BarberShop = require("../models/BarberShop");

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
  Appointment.find({_customer: req.user._id})
    .populate("_barberShop")
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
            "There is no Appointment with the id: " + req.params.appointmentId
        });
      }
    })
    .catch(err => next(err));
});

// Route to delete an appointment
router.delete("/appointment/:appointmentId", isLoggedIn, (req, res, next) => {
  Appointment.findById(req.params.appointmentId)
    .then(appointment => {
      if (req.user._id.equals(appointment._customer)) {
        Appointment.findByIdAndDelete(appointment._id).then(appointment => {
          res.json({
            success: true
          });
        });
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
router.get("/available-times/:barbershopId", (req, res, next) => {
  let { date } = req.query; // date = req.body.date
  if (!date) next({ status: 400, message: "You must send a date" })
  
  let _id = req.params.barbershopId;
  BarberShop.findById({ _id })
    .then(barbershop => {
      Appointment.find({ _barberShop: _id }).then(appointments => {
        console.log("barbershop", barbershop);
        console.log("appointments", appointments);
        let day = new Date(date).getDay(); // 0 => Sunday, 1 => Monday...
        let workingHourBegin, workingHourEnd;
        switch (day) {
          case 0:
            workingHourBegin = barbershop.workingHours.workingHourSunBegin;
            workingHourEnd = barbershop.workingHours.workingHourSunEnd;
            break;
          case 1:
            workingHourBegin = barbershop.workingHours.workingHourMonBegin;
            workingHourEnd = barbershop.workingHours.workingHourMonEnd;
            break;
          case 2:
            workingHourBegin = barbershop.workingHours.workingHourTusBegin;
            workingHourEnd = barbershop.workingHours.workingHourTusEnd;
            break;
          case 3:
            workingHourBegin = barbershop.workingHours.workingHourWedBegin;
            workingHourEnd = barbershop.workingHours.workingHourWedEnd;
            break;
          case 4:
            workingHourBegin = barbershop.workingHours.workingHourThuBegin;
            workingHourEnd = barbershop.workingHours.workingHourThuEnd;
            break;
          case 5:
            workingHourBegin = barbershop.workingHours.workingHourFriBegin;
            workingHourEnd = barbershop.workingHours.workingHourFriEnd;
            break;
          case 6:
            workingHourBegin = barbershop.workingHours.workingHourSatBegin;
            workingHourEnd = barbershop.workingHours.workingHourSatEnd;
            break;
          default:
            throw new Error("There is a problem with the day " + day);
        }
        let output = [];
        for (
          let hourAndMinutes = workingHourBegin * 60;
          hourAndMinutes < workingHourEnd * 60;
          hourAndMinutes += 50
        ) {
          output.push({
            hourAndMinutes: hourAndMinutes,
            status:
              appointments.filter(
                appointment => appointment.hourAndMinutes === hourAndMinutes
              ).length === 0
                ? "Available"
                : "Unavailable"
          });
        }
        res.json(output);
      });
    })
    .catch(err => next(err));
});

module.exports = router;
