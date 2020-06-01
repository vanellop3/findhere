const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let utilitySchema = new Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    creatorId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    town: {
        type: String
    },
    phone: {
        type: Number
    }
}, {
    collection: 'utility'
})

module.exports = mongoose.model('Utility', utilitySchema)