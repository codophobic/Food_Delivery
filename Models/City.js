const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city_id: {
        type: String
    },
    country_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('City', CitySchema);