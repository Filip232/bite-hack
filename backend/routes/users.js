const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Review = require('../models/review');

function updateAvgScore(userId) {
  Review.find({reviewedId: userId})
    .distinct('rating', (err, array) => {
      if (err) return console.log(err);
      const sum = array.reduce((a, b) => a + b, 0);
      avg = (sum / array.length) || -1;
      User.findById(userId, (err, obj) => {
        if (err) return console.log(err);
        obj.avgRating = avg;
        obj.save();
        return console.log('done');
      });
    });
};

router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;
  const surname = req.body.surname;
  const tel = req.body.tel;

  console.log(req.body);

  User.findOne({$or:[{email},{username}]}, (err, obj) => {
      if (err) return console.log(err);

      if (username.length < 5) {
        return res.status(400).send({msg: 'Login must have at least 5 characters.'})
      }

      if (obj) {
          return res.status(400).send({msg: 'User already exists.'});
      }

      if (password.length < 8 || !/\d/.test(password)) {
          return res.status(400).send({msg: "Password needs to be at least 8 characters long and have at least 1 number."})
      }
      bcrypt.hash(password, 12, (err, password) => {
          if (err) return console.log(err);

          const user = new User({username, password, email, name, surname, tel});
          user.save();
          return res.status(201).send({msg: 'User created!'});                    
      });
  });
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }, (err, obj) => {
      if (err) return console.log(err);

      if (!obj || obj.email !== email) {
          return res.status(400).send({msg: 'Wrong email or password.'});
      }

      bcrypt.compare(password, obj.password, (err, result) => {
          if (err) console.log(err);

          if (!result) return res.status(400).send({msg: 'Wrong email or password.'});
              
          const token1 = Math.random().toString(36);
          const token2 = Math.random().toString(36);
          const token = token1 + token2;
          bcrypt.hash(token, 12, (err, hash) => {
              if (err) return console.log(err);
              obj.sessionToken = hash;
              obj.save();

              return res.status(200).send({id: obj._id, token, username: obj.username, email: obj.email, name: obj.name, surname: obj.surname});
          });
      });
  });
});

router.post('/postReview', (req, res) => {
  console.log('test');
  const posterId = req.body.posterId;
  const reviewedId = req.body.reviewedId;
  const rating = req.body.rating;
  const comment = req.body.comment;
  const token = req.body.token;

  if (!posterId || !reviewedId || !token || !rating) return res.status(401).send({msg: 'Missing data. Check input.'});
  if (posterId === reviewedId) return res.status(401).send({msg: 'User cannot review himself.'});

  User.findOne({_id: posterId}, (err, obj) => {
    if (err) return console.log(err);

    bcrypt.compare(token, obj.sessionToken, (err, result) => {
      if (err) return console.log(err);

      if (!result) return res.status(401).send({msg: 'Wrong session token.'});

      Review.findOne({posterId, reviewedId}, (err, obj) => {
        if (err) return console.log(err);
    
        if (obj) return res.status(401).send({msg: 'Comment from this user alreayd exists.'});

        const review = new Review({posterId, reviewedId, rating, comment});
        review.save( (err) => {
          if (err) return console.log(err);
          updateAvgScore(reviewedId);
          return res.status(201).send({msg: 'Review added!'});
        });
      });
    }); 
  });
});

router.post('/updateReview', (req, res) => {
  const posterId = req.body.posterId;
  const reviewedId = req.body.reviewedId;
  const token = req.body.token;
  const rating = req.body.rating;
  const comment = req.body.comment;
  console.log('test');
  User.findOne({_id: posterId}, (err, obj) => {
    if (err) return console.log(err);
    bcrypt.compare(token, obj.sessionToken, (err, result) => {
      if (err) return console.log(err);
      if (!result) res.status(401).send({msg: 'Wrong session token.'});

      Review.findOne({posterId, reviewedId}, (err, obj) => {
        if (err) return console.log(err);
        if (!obj) return res.status(401).send({msg: 'No review.'});
    
        obj.rating = rating;
        obj.comment = comment;
    
        obj.save((err) => {
          if (err) return console.log(err);
          updateAvgScore(reviewedId);
          res.status(201).send({msg: 'Review updated!'});
        });
      });
    });
  });
});

router.delete('/deleteReview', (req, res) => {
  const posterId = req.body.posterId;
  const reviewedId = req.body.reviewerId;
  const token = req.body.token;
  User.findOne({ _id: posterId}, (err, obj) => {
    if (err) return console.log(err);

    bcrypt.compare(token, obj.sessionToken, (err, result) => {
      if (err) return console.log(err);
      if (!result) return res.status(401).send({msg: 'Wrong session token.'});
      
      Review.deleteOne({posterId, reviewedId}, (err) => {
        if (err) return console.log(err);
        updateAvgScore(reviewedId);
        return res.status(200).send({msg: 'Review deleted.'});
      });
    });
  });
});

router.get('/:id', (req, res) => {
  const user = req.params.id;
  const myId = req.query.id;

  User.findById(user, (err, obj) => {
    if (err) return console.log(err);
    Review.findOne({posterId: myId}, (err, myReview) => {
      if (err) return console.log(err);
      let review;
      if (myReview) {
        review = {
          rating: myReview.rating,
          comment: myReview.comment,
          id: myReview._id
        } 
      } else {
        review = null;
      };
      return res.status(200).send({name: obj.name, surname: obj.surname, username:obj.username, created: obj.created, email: obj.email, tel: obj.tel, imagePath: obj.imagePath, avgRating: obj.avgRating, review});
    });
  });
});

router.get("/reviews/:page", (req, res) => {
  const page = parseInt(req.params.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 50;
  const userId = req.query.userId;
  Review.find({reviewedId: userId})
    .sort({ update_at: -1 })
    .skip(page * limit) //Notice here
    .limit(limit)
    .exec((err, doc) => {
      if (err) return console.log(err);

      Review.countDocuments({reviewedId: userId}).exec((err, count) => {
        if (err) return console.log(err);
        return res.status(200).send({total: count, page: page, pageSize: doc.length, reviews: doc, maxPage: Math.ceil(count/limit)});
      });
    });
});

router.post('/updateUser', (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const surname = req.body.surname;
  const tel = req.body.tel;
  const password = req.body.password;
  const email = req.body.email;
  const userId = req.body.id;
  const token = req.body.token;

  User.findById(userId, (err, obj) => {
    if (err) return console.log(err);
    bcrypt.compare(token, obj.sessionToken, (err, result) => {
      if (err) return console.log(err);
      if (!result) return res.status(401).send({msg: 'Wrong token.'});

      if (username) obj.username = username;
      if (name) obj.name = name;
      if (surname) obj.surname = surname;
      if (tel) obj.tel = tel;
      if (password) {
        bcrypt.hash(password, 12, (err, hash) => {
          if (err) return console.log(err);
          obj.password = hash;
          obj.save();
        });
      if (email) obj.email = email;
      obj.save();
      return res.status(200).send({msg: 'User updated'});
      };
    });
  });
});

module.exports = router;
