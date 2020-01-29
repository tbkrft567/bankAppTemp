console.log('*****ROUTES*****');
const path = require("path");
const users = require('../controllers/users.js')
const sessions = require('../controllers/sessions.js')

module.exports = function (app) {

   app.post('/app/users/create', function (req, res) {
      sessions.create(req, res);
   })

   app.delete('/app/users/destroy/:id', function (req, res) {
      console.log("***DELETE_IN_ROUTES_JS***")
      sesssions.destroy(req, res);
   })

}