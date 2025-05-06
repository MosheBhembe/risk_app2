const mongoose = require('mongoose');

const MaintenanceSlipsSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    Name: { type: String, required: true },
    RegistrationNumber: {type: [String], required: true}, 
    DateDone: { type: String, required: true },
    TimeDone: {type: String, required: true}, 
    Cost: { type: String, required: true },
    Description: { type: String, required: true },
    KM: { type: String, required: true },
    Image: { type: String, required: true }
}, {
    collection: "Maintenance_Slip",
    timestamp: true,
})

mongoose.model("Maintenance_Slip", MaintenanceSlipsSchema);