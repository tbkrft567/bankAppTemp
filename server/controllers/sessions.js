console.log('****CONTROLLERS*****');

const User = require('../models/user.js');
const bcrypt = require('bcrypt')

module.exports = {
   create: function (req, res) {
      console.log(req.body)
      userEmail = req.body.email
      userPassword = req.body.password
      console.log('**USER LOGIN**', req.body.password)
      User.findOne({ email: userEmail })
         .then(user => {
            console.log('bcrypt')
            bcrypt.compare(userPassword, user.password) //(formPassword, DB_password)
               .then(result => {
                  if (result) {
                     console.log(result)
                     const SECRET = process.env.JWT_KEY
                     var USERINFO = { email: user.email, userId: user._id }
                     const token = jwt.sign(USERINFO, SECRET, { expiresIn: '1h' })  //Stored on the client****
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
            res.json(
               console.log('***LOGIN FAILED***'),
               { error: err })
         })
   },

   destroy: function (req, res) {

   },
}
