const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const Users = require('../models/User');

exports.registerUser = function (req, res) {
    const {errors, isValid} = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    Users.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {
            const newUser = new Users({
                username: req.body.username,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                phone:req.body.phone,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
}

exports.loginUser = function (req, res) {
    const {errors, isValid} = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    Users.findOne({email})
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            username: user.username,
                            firstName:user.firstName,
                            lastName:user.lastName,
                            phone:user.phone,
                            // avatar: user.avatar,
                            isAdmin: user.isAdmin,
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    } else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
}

exports.editUser = function (req, res, next) {
    Users.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
}

exports.updateUser = function (req, res, next) {
    var hashpass;
    bcrypt.hash(req.body.password, 10).then((hash) => {
        hashpass = hash;
    })

    Users.findOneAndUpdate({_id:req.params.id}, req.body, function (err, user) {
        console.log(user);
        user.password=hashpass;
        user.save()
        .then(user => {
            res.json(user)
        });
      });
}

exports.authenticateMe = function (req, res) {
    return res.json({
        id: req.user.id,
        username: req.user.username,
        firstName: req.user.firstName,
        lastName:req.user.lastName,
        phone:req.user.phone,
        email: req.user.email,
        isAdmin: req.user.isAdmin
    });
}


