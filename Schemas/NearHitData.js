const mongoose = require('mongoose');

const NearHitDataSchema = mongoose.Schema({
    Name: String,
    Location: String,
    Description: String,
    Equipment: String,
    Date: { type: Date, required: true }
}, {
    collection: 'HitData'
});

mongoose.model('HitData', NearHitDataSchema); 