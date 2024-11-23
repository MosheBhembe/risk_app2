const mongoose = require('mongoose');

const ConsumptionDataSchema = mongoose.Schema({
    Name: String,
    Registration: String,
    Amount: String,
    Cost: String,
    Image: String,
    DateTime: { type: Date, required: true }
}, {
    collection: "consumptionData"
});

mongoose.model('consumptionData', ConsumptionDataSchema); 