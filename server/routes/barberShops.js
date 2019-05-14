const express = require('express');
const barberShop = require('../models/barberShop')
const { isLoggedIn } = require("../middlewares")

const router = express.Router();

// Route to create a BarberShop
router.post('/barbershops', (req, res, next) => {
  let { name, gender, address, workingHours, logo } = req.body
  barberShop.create({ name, gender, address, workingHours, logo })
    .then(barbershops => {
      res.json({
        success: true,
        barbershops
      });
    })
    .catch(err => next(err))
});

// Route to delete a Barbershop
// router.delete("/visits/:visitId", isLoggedIn, (req,res,next) => {
//   barberShop.findById(req.params.barberShopId)
//     .then(barbershop => {
//       if(barbershop._user.equals(req.user._id)){
//         barberShop.findByIdAndRemove(req.params.visitId)
//         .then(barbershop => {
//           res.json({
//             success: true,
//             barbershop,
//             message: "The barbershop was successfully deleted"
//           })
//         })
//         .catch(err => next(err))
//       } else {}
//     })
// })

module.exports = router;
