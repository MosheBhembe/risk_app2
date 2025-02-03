const mongoose = require('mongoose');

const ConsumptionDataSchema = mongoose.Schema({
    Name: String,
    Registration: String,
    Amount: String,
    Cost: String,
    Image: String,
    DateTime: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    collection: "consumptionData"
});

mongoose.model('consumptionData', ConsumptionDataSchema); 