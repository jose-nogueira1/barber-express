const express = require("express");
const Appointment = require("../models/Appointment");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();


// Create an appointment
router.post("/appointments", isLoggedIn, (req,res,next) => {
  let { _baberShop, date, hourAndMinutes } = req.body
  let _customer = req.user._id
  Appointment.create({ _baberShop, date, hourAndMinutes, _customer })
    .then(appointment => {
      res.json({
        success: true,
        appointment
      });
    })
    .catch(err => next(err));   
  // Bonus: make sure there is a free spot at that time
})


// Route to get all available appointment, on a specific date and a specific barber shop
// Example input: GET /api/available-appointments (_baberShop="12345679abcdef", date="2019-05-16")
// Example output: [
//  {numbersAndMinute: 540, status: "Available"},
//  {numbersAndMinute: 585, status: "Unavailable"},
//  {numbersAndMinute: 630, status: "Unavailable"},
// ]
router.get("/available-appointments", (req,res,next) => {
  let { _baberShop, date } = req.body
  // TODO: continue 

})


module.exports = router;