const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;
  const surname = req.body.surname;

  console.log(req.body);

  User.findOne({$or:[{email},{username}]}, (err, obj) => {
      if (err) return console.log(err);

      if (obj) {
          return res.status(400).send({errors: ['Użytkownik już istnieje.']});
      }

      if (password.length < 8 || !/\d/.test(password)) {
          return res.status(400).send({errors: ["Hasło musi mieć minimum 8 znaków i 1 cyfrę."]})
      }
      bcrypt.hash(password, 12, (err, password) => {
          if (err) return console.log(err);

          const user = new User({username, password, email, name, surname});
          user.save();
          return res.status(201).send({msg: 'User created!'});                    
      });
  });
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }, (err, obj) => {
      if (err) return console.log(err);

      if (!obj || obj.username !== username) {
          return res.status(400).send({errors: ['Błędny login lub hasło']});
      }

      bcrypt.compare(password, obj.password, (err, result) => {
          if (err) console.log(err);

          if (!result) return res.status(400).send({errors: ['Błędny login lub hasło']});
              
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
