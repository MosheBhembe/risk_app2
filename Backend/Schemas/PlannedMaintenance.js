const mongoose = require('mongoose');
const PlannedMaintenanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    Registration: { type: String, required: true, unique: true },
    MTCE: { type: String, required: true },
    DateDone: { type: String, required: true },
    Cost: { type: String, required: true },
    Kilometers: { type: String, required: true },
    Attachment: { type: String, required: true }
}, {
    collection: "Maintenance",
    timestamps: true
});

mongoose.model('Maintenance', PlannedMaintenanceSchema);

