const validateUtility = require('../validation/utility');

let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Utility Model
let utilitySchema = require('../models/Utility');

// CREATE Student
router.route('/create-utility').post(function (req, res,next) {
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
});

// READ Utilities
router.route('/').get((req, res) => {
    utilitySchema.find((error, data, next) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single Utilities
router.route('/edit-utility/:id').get((req, res) => {
    utilitySchema.findById(req.params.id, (error, data, next) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Utilities
router.route('/update-utility/:id').put((req, res, next) => {
    utilitySchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Utility updated successfully !')
        }
    })
})

// Delete Utilities
router.route('/delete-utility/:id').delete((req, res, next) => {
    utilitySchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = router;