const mongoose = require('mongoose');


const unplannedMaintenanceSchema = new mongoose.Schema({

    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // Vehicle Information 
    VehicleMake: { type: String, required: true },
    VehicleModel: { type: String, required: true },
    VehicleRegistration: { type: String, required: true, unique: true },

    // Fixes 
    PartName: { type: String, required: true },
    PartSerialNumber: { type: String, required: true, unique: true },
    PartProblem: { type: String, required: true },
    Image: { type: String, required: true },

    Date: { type: Date, required: true }
}, {
    collection: "Unplanned",
    timestamp: true
});

mongoose.model('Unplanned', unplannedMaintenanceSchema); 