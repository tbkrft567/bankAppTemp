console.log('****CONTROLLERS*****');

const User = require('../models/user.js');
const Account = require('../models/account.js');
const Transaction = require('../models/transaction');

module.exports = {
    index: function (req, res) {
        console.log("**TRANSACTION_CONTROLLER_FIND_ALL***")
        Transaction.find()
            .then(data => res.json({ transaction: data }))
            .catch(err => {
                console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },

    show: function (req, res) {
        console.log('**TRANSACTION_CONTROLLER_GETONE ***', req.params)
        Transaction.findOne({ _id: req.params.id})
            .then(transaction => res.json({transaction: transaction}))
            .catch(err => {
                console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },


    create: function (req, res) {
        console.log(req.body);
        User.findOne({_id: req.params.userid})
            .then(user => {
                for(var i = 0; i < user.accounts.length; i++){
                    if(user.accounts[i]._id == req.params.accountid){
                        Transaction.create(req.body)
                        .then(transaction => {
                            Account.update({},{})
                            .then({})
                            .catch({})
                            // Account.update({_id: req.params.accountid}, {$push: {transactions: transaction })
                            //     .then(tranConfirmation => {
                            //         console.log(tranConfirmation)
                            //     })
                            //     .catch(err => {
                            //         console.log(err)
                            //     })
                            })
                        .catch(err => console.log(err))
                        
                    }
                }
            })
            .catch(err => console.log(err))

        

            // .then(data => { console.log(data); res.json(data) })
            // .catch(err => {
            //     console.log("**TRANSACTION_CREATE_ERROR**");
            //     console.log(err);
            //     for (var key in err.errors) {
            //         req.flash('registration', err.errors[key].message);
            //     }
            //     console.log("***ERRORS HERE ***", err)
            //     res.json({ errors: err });
            // });
    },

    update: function (req, res) {
        console.log(req.body);
        Transaction.findOne({ _id: req.body._id })
            .then(transaction => {

                transaction.date =  req.body.date;
                transaction.amount = req.body.amount;
                transaction.type = req.body.type;
                transaction.location = req.body.location;
                return Transaction.save();
            })
            .then(saveResult => res.json(saveResult))
            .catch(err => {
                console.log("****ERRROR HERE****");
                console.log(err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json({errors: err});
            });
    },

    destroy: function (req, res) {
        console.log("Destroy_CONTROLLER", req.params);
        Transaction.findOne({_id: req.params.id})
        .then(transaction =>{ (console.log( "***FOUND_DESTROY_TRANSACTION***", transaction))
            transaction.remove()
        })
        .then(saveresult => res.json(saveresult))
        .catch(err => {
            console.log("****ERRROR HERE****");
            console.log(err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.json({errors: err.errors});
        });
    },
}
