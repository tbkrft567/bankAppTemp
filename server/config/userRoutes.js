console.log('*****ROUTES*****');
const path =  require("path");
const authorizeUser = require('../middleware/authorizeUser')
const users = require('../controllers/users.js')
const sessions = require('../controllers/sessions.js')

module.exports = function(app) {

    app.get('/app/users/all', authorizeUser, function(req, res) {
        users.index(req, res);
    })

    app.get('/app/users/:id', authorizeUser, function(req, res) {
        console.log("***ROUTESJS***", req.params.id)
        users.show(req, res);
    })

    app.post('/app/users/create', function(req, res) {
        users.create(req, res);
    })

    app.put('/app/users/update', authorizeUser, function(req, res) {
        console.log("**UPDATE ROUTE***", req.body)
        users.update(req, res);
    })

    app.delete('/app/users/destroy/:id', authorizeUser, function(req, res) {
        console.log("***DELETE_IN_ROUTES_JS***")
        users.destroy(req, res);
    })

}