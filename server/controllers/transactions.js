console.log('****CONTROLLERS*****');

const User = require('../models/user.js');
const Account = require('../models/account.js').Account;
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

        const newTran = new Transaction()
        newTran.amount = req.body.amount
        newTran.date = req.body.date
        newTran.type = req.body.type
        newTran.location = req.body.location
        newTran.save()
            .then(newTrans =>
                User.findOne({_id: req.params.userid})
                    .then( user => {
                        const account = user.accounts
                        for(var i = 0; i < account.length; i++){
                            if(account[i]._id == req.params.accountid){
                                account[i].transactions.push(newTrans)
                                user.save()
                                res.json(user)
                            }
                        }
                    })
                    .catch(err => {console.log(err)})
                )
            .catch(err => console.log(err))
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
