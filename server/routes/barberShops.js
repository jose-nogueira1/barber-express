const express = require('express');
const barberShop = require('../models/barberShop')

const router = express.Router();

// Route to get all BarberShops
router.get('/', (req, res, next) => {
  barberShop.find()
    .then(barbershops => {
      res.json(barbershops);
    })
    .catch(err => next(err))
});

// Route to add a BarberShop
router.post('/', (req, res, next) => {
  let { name, capitals, area, description } = req.body
  Country.create({ name, capitals, area, description })
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err))
});

module.exports = router;
