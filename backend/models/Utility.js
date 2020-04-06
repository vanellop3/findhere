const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let utilitySchema = new Schema({
    title: {
        type: String
    },
    category:{
      type:String
    },
    description: {
        type: String
    },
    price:{
        type:Number
    },
    creatorId:{
      type:String
    },
    phone:{
        type:String
    }
}, {
    collection: 'utility'
})

module.exports = mongoose.model('Utility', utilitySchema)