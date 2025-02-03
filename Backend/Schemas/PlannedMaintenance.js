const mongoose = require('mongoose');
const PlannedMaintenanceSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // Vehicle Information 
    VehicleMake: { type: String, required: true },
    VehicleModel: { type: String, required: true },
    VehicleRegistration: { type: String, required: true, unique: true },

    // Fixes 
    PartName: { type: String, required: true },
    PartSerialNumber: { type: String, required: true, unique: true },
    PartProblemDescription: { type: String, required: true },
    File: { type: String },
    Image: { type: String },

    ScheduledDate: { type: Date, required: true }
}, {
    collection: "Planned",
    Timestamp: true
});

mongoose.model("Planned", PlannedMaintenanceSchema); 