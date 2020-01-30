console.log('****CONTROLLERS*****');
const User = require('../models/user.js');
const Account = require('../models/account.js').Account;
const Checking = require('../models/account.js').Checking;
const Savings = require('../models/account.js').Savings;
const Loan = require('../models/account.js').Loan;
const Credit = require('../models/account.js').Credit;
const Transaction = require('../models/transaction.js')

module.exports = {
    test: function(req, res) {
        // User.update({_id: req.params.id}, {$set: { accounts: [] }})
        //     .then(result => {
        //         console.log(result)
        //     })
        //     .catch(err => console.log(err))

        User.remove()
            .then(result => {
                res.json(result)
            })
            .catch(err => console.log(err))
    },

    index: function (req, res) {
        // console.log("*****CONTROLLER******")
        // Account.find()
        //     .then(data => res.json({ pets: data }))
        //     .catch(err => {
        //         console.log("We have an error!", err);
        //         for (var key in err.errors) {
        //             req.flash('registration', err.errors[key].message);
        //         }
        //         res.json(err.errors[key].message);
        //     });
        Account.find()
            .then(result = console.log('All Accounts'))
            .catch(err = console.log('All Errors'))
    },


    csv: function (req, res) {

        const account = Account.find({ _id: req.params.id })

        const filename = "${account.lastFour}" + '_' + "transactions";
        const transactions = account.transactions;

        //NOTE .lean() transforms a mongoose document into a javascript array;
        transactions.lean().exec({}, function (err, transactionList) {
            if (err) res.json(err);

            res.setHeader('Content-Type', 'text/csv');

            res.setHeader("Content-Disposition", 'attachment; filename=' + filename);

            res.csv(transactionList, true);

        })
    },


    show: function (req, res) {
        console.log('**CONTROLLER GETONE ***', req.params)
        Account.findOne({ _id: req.params.id })
            .then(account => res.json({ account: account }))
            .catch(err => {
                console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },



    createChecking: function (req, res) {
        // User.update({_id: req.params.id}, {$set:{accounts: []}})
        // .then(data => console.log("x"))
        User.findOne({_id: req.params.id})
        .then(user => {
            console.log(user)
            const account = new Checking()
            account.accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
            account.accountType = "Checking"
            return account.save()
        })
        .then(account => {
            console.log('here')
            console.log(account)
            User.findOne({_id: req.params.id})
            .then(user => {
                user.accounts.push(account);
                user.save();
            })
            .catch(err => {
                console.log('this is an error')
            })
        })
        .then((newCheckingData) => res.json({message: 'Success', account: newCheckingData}))
        .catch(err => res.json({ errors: err }))
    },

    createSavings: function (req, res) {
        User.findOne({ _id: req.params.id })
            .then(user => {

                console.log(user)
                const account = new Savings()
                console.log(account, "*******")
                account.interest = req.body.interest
                account.minimum_balance = req.body.minimum_balance
                account.accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
                account.accountType = "Savings"
                return account.save()
            })
            .then(account => {
                User.findOne({ _id: req.params.id })
                    .then(user => {
                        user.accounts.push(account);
                        user.save();
                        res.json(user)
                    })
                    .catch(err => {console.log(err)})
            })
            // .then((newSavingsData) => res.json({ message: 'Success', account: newSavingsData }))
            .catch(err => res.json({ errors: err }))
    },

    createLoan: function (req, res) {
        User.findOne({ _id: req.params.id })
            .then(user => {
                const account = new Loan()
                numbers = Math.floor(Math.random() * 9000000000) + 1000000000
                console.log(numbers)
                account.accountNumber = numbers;
                account.accountType = "Loan"
                return account.save()
            })
            .then(account => {
                console.log(account)
                User.findOne({ _id: req.params.id })
                    .then(user => {
                        user.accounts.push(account);
                        user.save();
                    })
            })
            .then((newLoanData) => res.json({ message: 'Success', account: newLoanData }))
            .catch(err => res.json({ errors: err }))
    },

    createCredit: function (req, res) {
        User.findOne({ _id: req.params.id })
            .then(user => {
                const account = new Credit(interest=.2)
                account.accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
                account.accountType = "CreditCard"
                return account.save()
            })
            .then(account => {
                console.log(account)
                User.findOne({ _id: req.params.id })
                    .then(user => {
                        user.accounts.push(account);
                        user.save();
                    })
            })
            .then((newCreditData) => res.json({ message: 'Success', account: newCreditData }))
            .catch(err => res.json({ errors: err }))
    },

    update: function (req, res) {
        console.log(req.body);
        User.findOne({ _id: req.body._id })
            .then(pet => {

                return User.save();
            })
            .then(saveResult => res.json(saveResult))
            .catch(err => {
                console.log("****ERRROR HERE****");
                console.log(err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json({ errors: err });
            });
    },

    destroy: function (req, res) {
        console.log("Destroy_CONTROLLER", req.params);
        User.findOne({ _id: req.params.id })
            .then(user => {
                (console.log("***FOUND_DESTROY_PET***", pet))
                user.remove()
            })
            .then(saveresult => res.json(saveresult))
            .catch(err => {
                console.log("****ERRROR HERE****");
                console.log(err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json({ errors: err.errors });
            });
    },
}
