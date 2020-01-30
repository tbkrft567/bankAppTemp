console.log('***TRANSACTION_ROUTES***')

const authorizeUser = require('../middleware/authorizeUser')
const transactions = require('../controllers/transactions.js')

module.exports = function(app){
    app.get('/app/transactions/all/:id', authorizeUser, function(req, res) {
        //NOTE ID PARAM HERE IS ACCOUNT ID
        transactions.index(req, res);
    })

    app.get('/app/transactions/:id', authorizeUser, function(req, res) {
        console.log("**GET_ONE_TRANSACTION_ROUTE**", req.params.id)
        transactions.show(req, res);
    })

    app.post('/app/transactions/create/:userid/:accountid', authorizeUser, function(req, res) {
        //NOTE ID PARAM HERE IS ACCOUNT ID
        transactions.create(req, res);
    })

    app.put('/app/transactions/update', authorizeUser, function(req, res) {
        console.log("**UPDATE ROUTE***", req.body)
        transactions.update(req, res);
    })

    app.delete('/app/transactions/destroy/:id', authorizeUser, function(req, res) {
        console.log("**TRANSACTION_ROUTE_DELETE**")
        transactions.destroy(req, res);
    })
}