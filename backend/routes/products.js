const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');

router.post('/add', (req, res) => {
  const ownerId = req.body.userId;
  const images = req.body.images;
  const description = req.body.description;
  const productName = req.body.productName;
  const location = req.body.location;
  const token = req.body.token;

  if (!ownerId || !images || !description || !productName || !location || !token) return res.status(400).send({msg: 'Missing data. Check input.'});

  User.findOne({_id: ownerId}, (err, obj) => {
    if (err) return console.log(err);

    bcrypt.compare(token, obj.sessionToken, (err, result) => {
      if (err) return console.log(err);

      if (!result) res.status(401).send({msg: 'Wrong session token.'});
    }); 
  });

  const product = new Product({ownerId, images, description, productName, location});
  product.save( (err, product) => {
    if (err) return res.status(401).send({msg: "Couldn't save product. Check input data."});
    res.status(201).send({msg: 'Product added!', productId: product._id});
  })
});

module.exports = router;