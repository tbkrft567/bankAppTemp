console.log('****CONTROLLERS*****');

const User = require('../models/user.js');
const bcrypt = require('bcrypt')

module.exports = {
    index: function (req, res) {
        console.log("***USERS_CONTROLLER_FIND_ALL***")
        User.find()
            .then(data => res.json({ users: data }))
            .catch(err => {
                console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },

    show: function (req, res) {
        console.log('**USER_CONTROLLER_GETONE ***', req.params)
        User.findOne({ _id: req.params.id })
            .then(pet => res.json({ pet: pet }))
            .catch(err => {
                console.log("We have an error!", err);
                for (var key in err.errors) {
                    req.flash('registration', err.errors[key].message);
                }
                res.json(err.errors[key].message);
            });
    },

    create: function (req, res) {
        // User.remove()
        //     .then(removed => {
        //         console.log(removed)
        //     })
        // User.find()
        // .then(found=>{console.log(found)})
        console.log(req.body);
        User.find({ email: req.body.email })
            .then(user => {
                console.log(user)
                if (user.length > 0) {
                    return Promise.reject({ unique: "That email already exists." })
                }
                else {
                    bcrypt.hash(req.body.password, 10)
                        .then(hashedPassword => {
                            console.log(hashedPassword)
                            newUser = ({ "firstName": req.body.firstName, "lastName": req.body.lastName, "birthday": req.body.birthday, "email": req.body.email, "password": hashedPassword })
                            User.create(newUser)
                                .then(userConfirm => {
                                    res.json(userConfirm)
                                })
                                .catch(err => res.json({ errors: err }))
                        })
                        .catch(err => res.json({ errors: err }))
                }
            })
            .catch(err => {
                console.log("****USER CREATED ERROR****");
                // console.log(err);
                // for (var key in err.errors) {
                //     req.flash('registration', err.errors[key].message);
                // }
                // console.log("***ERRORS HERE ***", err)
                res.json({ errors: err });
            });
    },

    update: function (req, res) {
        console.log(req.body);
        User.findOne({ _id: req.body._id })
            .then(user => {
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
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
