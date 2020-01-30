console.log('****CONTROLLERS*****');

const User = require('../models/user.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
   create: function (req, res) {
      userEmail = req.body.email
      userPassword = req.body.password
      console.log('**USER LOGIN**', req.body.password)
      User.findOne({ email: userEmail })
         .then(user => {
            bcrypt.compare(userPassword, user.password) //(formPassword, DB_password)
               .then(result => {
                  console.log(result)
                  if (result) {
                     const SECRET = process.env.JWT_KEY
                     var USERINFO = { email: user.email, userId: user._id }
                     const token = jwt.sign(USERINFO, SECRET, { expiresIn: '1h' })  //Stored on the client****
                     console.log(token)
                     res.json(
                        { message: "Authentication Successful", token: token }
                     )
                  }
                  else {
                     res.json(
                        { error: "Authentication Failed" }
                     )
                  }
               })
               .catch(err => {
                  res.json({ error: err })
               })
         })
         .catch(err => {
            res.status(401).json(
               { error: err })
         })
   },
}
