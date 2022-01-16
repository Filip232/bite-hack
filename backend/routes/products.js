const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');
const bcrypt = require('bcrypt');

function getUsernameById(userId) {
  return User.findOne({ '_id': userId });
};

router.post('/add', (req, res) => {
  const ownerId = req.body.ownerId;
  const images = req.body.images;
  const description = req.body.description;
  const productName = req.body.productName;
  const location = req.body.location;
  const token = req.body.token;
  const category = req.body.category;

  if (!ownerId || !images || !description || !productName || !location || !token || !category) return res.status(400).send({msg: 'Missing data. Check input.'});

  User.findOne({_id: ownerId}, (err, obj) => {
    if (err) return console.log(err);

    bcrypt.compare(token, obj.sessionToken, (err, result) => {
      if (err) return console.log(err);

      if (!result) return res.status(401).send({msg: 'Wrong session token.'});

      const product = new Product({ownerId, images, description, productName, location, category});
      product.save( (err, product) => {
        if (err) return res.status(401).send({msg: "Couldn't save product. Check input data.", err: err});
        return res.status(201).send({msg: 'Product added!', productId: product._id});
      });
    }); 
  });
});

router.get("/productList/:page", (req, res) => {
  const page = parseInt(req.params.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 50;
  const category = req.query.category;
  let query;
  if (category) {
    query = {category};
  } else {
    query = {}
  }
  console.log(page, limit, category);
  Product.find(query)
    .sort({ update_at: -1 })
    .skip(page * limit) //Notice here
    .limit(limit)
    .exec((err, doc) => {
      if (err) return console.log(err);
      Product.countDocuments(query).exec(async (err, count) => {
        if (err) return console.log(err);
        for (let i = 0; i < doc.length; i++) {
          const userDetails = await getUsernameById(doc[i].ownerId);
          const toSave = { ...doc[i] }
          toSave['_doc'].username = userDetails.username;
        }
        return res.status(200).send({total: count, page: page, pageSize: doc.length, products: doc, maxPage: Math.ceil(count/limit)});
      });
    });
});

router.get('/:id', (req, res) => {
  const product = req.params.id;

  Product.findById(product, (err, obj) => {
    User.findById(obj.ownerId, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).send({productName: obj.productName, images: obj.images, ownerId:obj.ownerId, location: obj.location, description: obj.description, category: obj.category, username: user.username, avgRating: user.avgRating});  
    });
  });
});

router.get('/data/categories', (req, res) => {
  return res.status(200).send({categories: ['Elektronika', 'Dom', 'Rozrywka', 'Moda', 'Inne', 'Wszystko']});
});


module.exports = router;