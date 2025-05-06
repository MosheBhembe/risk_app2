const mongoose = require('mongoose');

const ConsumptionDataSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    Date: { type: String, required: true },
    NameSurname: { type: String, required: true },
    Registration: { type: [String], required: true },
    FuelType: { type: [String], required: true },
    Cost: { type: String, required: true },
    KM: { type: String, required: true },
    Image: { type: String, required: true }
}, {
    collection: "consumptionData",
    timestamp: true
});

mongoose.model('consumptionData', ConsumptionDataSchema); 