console.log('***ACCOUNT ROUTES***')

const accounts = require('../controllers/accounts')
const authorizeUser = require('../middleware/authorizeUser')

module.exports = function(app){

    app.get('/app/accounts/all/:id', authorizeUser,  function(req, res) {
        //NOTE ID PARAM HERE IS USER ID
        console.log('GET_ALL_ACCOUNTS_ROUTE')
        accounts.index(req, res);
    })
    app.get('/app/accounts/index', authorizeUser, function(req, res) {
        //NOTE ID PARAM HERE IS USER ID
        console.log('GET_ALL_ACCOUNTS_ROUTE')
        accounts.index(req, res);
    })

    app.get('/app/accounts/:id', authorizeUser, function(req, res) {
        console.log("***GET_ONE_ACCOUNT_ROUTE***", req.params.id);
        accounts.show(req, res);
    })

    app.post('/app/accounts/checking/create/:id', authorizeUser, function(req, res) {
        //NOTE ID PARAM HERE IS USER ID
        console.log(req.params.id)
        console.log('***CREATE_CHK_ACCOUNT_ROUTE***');
        accounts.createChecking(req, res);
    })

    app.post('/app/accounts/savings/create/:id', authorizeUser, function(req, res) {
        //NOTE ID PARAM HERE IS USER ID
    
        console.log('***CREATE_SVG_ACCOUNT_ROUTE***');
        accounts.createSavings(req, res);
    })

    app.post('/app/accounts/loan/create/:id', authorizeUser, function(req, res) {
        //NOTE ID PARAM HERE IS USER ID
        console.log('***CREATE_LN_ACCOUNT_ROUTE***');
        accounts.createLoan(req, res);
    })

    app.post('/app/accounts/credit/create/:id', authorizeUser, function(req, res) {
        //NOTE ID PARAM HERE IS USER ID
        console.log('***CREATE_CC_ACCOUNT_ROUTE***');
        accounts.createCredit(req, res);
    })

    app.put('/app/accounts/update', authorizeUser, function(req, res) {
        console.log("**UPDATE_ACCOUNT_ROUTE***", req.body);
        // accounts.update(req, res);
    })

    app.delete('/app/accounts/destroy/:id', authorizeUser, function(req, res) {
        console.log("***DELETE_ACCOUNT_ROUTE***");
        accounts.destroy(req, res);
    })

    app.get('/app/exporttocsv', authorizeUser, function(req, res, next) {
        console.log("**CSV_ACCOUNT_ROUTE**")
        accounts.csv(req, res);
    })

    // app.get('/tester/:userid/:accountid', function(req, res, next){
    //     accounts.test(req, res);
    // })
}