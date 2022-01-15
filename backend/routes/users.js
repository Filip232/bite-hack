const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.send('dziala');
})

router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  console.log(res.body);

  User.findOne({$or:[{email},{username}]}, (err, obj) => {
      if (err) return console.log(err);

      if (username.length < 5) {
        return res.status(400).send({msg: 'Login must have at least 5 characters.'})
      }

      if (obj) {
          return res.status(400).send({msg: ['User already exists.']});
      }

      if (password.length < 8 || !/\d/.test(password)) {
          return res.status(400).send({msg: ["Password needs to be at least 8 characters long and have at least 1 number."]})
      }
      bcrypt.hash(password, 12, (err, password) => {
          if (err) return console.log(err);

          const user = new User({username, password, email});
          user.save();
          return res.status(201).send('User registered!');                    
      });
  });
})

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }, (err, obj) => {
      if (err) return console.log(err);

      if (!obj || obj.username !== username) {
          return res.status(400).send({msg: ['Wrong login or password.']});
      }

      bcrypt.compare(password, obj.password, (err, result) => {
          if (err) console.log(err);

          if (!result) return res.status(400).send({msg: ['Wrong login or password.']});
              
          const token1 = Math.random().toString(36);
          const token2 = Math.random().toString(36);
          const token = token1 + token2;

          bcrypt.hash(token, 12, (err, hash) => {
              if (err) return console.log(err);
              obj.sessionToken = hash;
              
              obj.save();

              return res.status(200).send({id: obj._id, token: obj.sessionToken, username: obj.username, email: obj.email});
          });
      });
  });
});

module.exports = router;
