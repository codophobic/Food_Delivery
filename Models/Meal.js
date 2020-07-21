const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const MealTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    meal_type: {
        type: Number,
        required: true
    },
    thumbs:{
        type:String
    }
})

module.exports = mongoose.model('MealType', MealTypeSchema);