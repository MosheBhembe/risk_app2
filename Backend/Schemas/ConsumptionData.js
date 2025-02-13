const mongoose = require('mongoose');

const ConsumptionDataSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    NameSurname: { type: String, required: true },
    Registration: { type: String },
    AssetType: { type: String, required: true },
    Image: { type: String, required: true }
}, {
    collection: "consumptionData",
    timestamp: true
});

mongoose.model('consumptionData', ConsumptionDataSchema); 