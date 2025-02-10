const mongoose = require('mongoose');

const ConsumptionDataSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Registration: { type: String, required: true },
    Image: { type: String, required: true }
}, {
    collection: "consumptionData",
    timestamp: true
});

mongoose.model('consumptionData', ConsumptionDataSchema); 