console.log('*****ROUTES*****');
const path = require("path");
const users = require('../controllers/users.js')
const sessions = require('../controllers/sessions.js')

module.exports = function (app) {

   app.post('/app/sessions/create', function (req, res) {
      sessions.create(req, res);
   })
}