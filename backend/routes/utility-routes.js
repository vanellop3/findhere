let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// Student Model
let utilitySchema = require('../models/Utility');

// CREATE Student
router.route('/create-utility').post((req, res, next) => {
    utilitySchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log(data)
            res.json(data)
        }
    })
});

// READ Students
router.route('/').get((req, res) => {
    utilitySchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Single Student
router.route('/edit-utility/:id').get((req, res) => {
    utilitySchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Student
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

// Delete Student
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