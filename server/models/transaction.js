console.log('***Transaction_MODEL***');

const accounts = require('../models/account.js').Account;
const Checking = require('../models/account.js').Checking;
const Savings = require('../models/account.js').Savings;
const Loan = require('../models/account.js').Loan;
const Credit = require('../models/account.js').Credit;

const mongoose = require('mongoose')
    const TransactionSchema = new mongoose.Schema({
        date: {type: Date},
        amount: {type: Number},
        type: {type: String}, 
        location: {type: String},
    }, { timestamps: true })
    const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction
