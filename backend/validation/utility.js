const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUtility(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.town = !isEmpty(data.town) ? data.town : '';

    if(!Validator.isLength(data.title, { min: 2, max: 100 })) {
        errors.title = 'Title must be between 2 to 100 chars';
    }

    if(Validator.isEmpty(data.title)) {
        errors.title = 'Name field is required';
    }

    if(Validator.isEmpty(data.category)) {
        errors.category = 'Category is required';
    }

    if(Validator.isEmpty(data.town)) {
        errors.town = 'Town is required';
    }

    if(Validator.isEmpty(data.price)) {
        errors.price = 'Price is required';
    }

    if(Validator.isEmpty(data.phone)) {
        errors.phone = 'Price is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}