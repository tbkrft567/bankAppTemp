console.log('***ACCOUNT_MODEL***');

const mongoose = require('mongoose');

var options = {discriminatorKey: 'type'};


const transactions = require('../models/transaction.js');

const AccountSchema = new mongoose.Schema({
    
    accountNumber: {type: Number,
        immutable: true
    },
        
        balance: { type: Number, default: 0 },
        transactions: [transactions.schema],
        accountType: {type: String}
    }, options, { timestamps: true }, { collection: 'accounts', discriminatorKey : '_type'}
    )
    
    
    AccountSchema.pre('save', function(next) {
        this.accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    })

    // //TODO  NEEDS TO BE TESTED
    AccountSchema.virtual('lastFour').get(function() {
        const split = this.accountNumber.split()
        const lastFour = [];
            for (var i=7; i<split.length; i++){
                lastFour.push(split[i]);
            }
        return lastFour.join("");
    })
    
    const Account = mongoose.model('Account', AccountSchema);
    
    const Checking = Account.discriminator('checking', new mongoose.Schema({
        
    }))

    const Savings = Account.discriminator('savings', new mongoose.Schema({
            interest: {type: Number, default: 0},
            minimum_balance: {type: Number, default: 0},
        })
    )

    const Loan = Account.discriminator('loan', new mongoose.Schema({
            interest: {type: Number, default: 1.3},
            number_of_payments: {type: Number, default: 120},
            minimum_payment: {type: Number, default: 25},
        })
    )

    const Credit = Account.discriminator('credit', new mongoose.Schema({
            interest: {type: Number,default: 1.3},
            points: {type: Number, default: 1500},
            available_credit: {type: Number, default: 3500},
            minimum_payment: {type: Number, default: 25}
        })
    )

module.exports = {Account:Account, Checking:Checking, Savings:Savings, Loan:Loan, Credit:Credit}
