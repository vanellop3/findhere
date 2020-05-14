const validateUtility = require('../validation/utility');

let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let utilitySchema = require('../models/Utility');

exports.create_utility = function (req, res,next) {
    const {errors, isValid} = validateUtility(req.body);
    console.log(isValid);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    utilitySchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
}

exports.getAllUtilities = function (req, res) {
    utilitySchema.find((error, data, next) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
}

exports.editUtility = function (req, res) {
    utilitySchema.findById({_id: req.params.id}, (error, data, next) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
}

exports.updateUtility = function (req, res, next) {
    utilitySchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Utility updated successfully !')
        }
    })
}

exports.deleteUtility = function (req, res, next) {
    utilitySchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
}