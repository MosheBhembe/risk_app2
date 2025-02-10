const mongoose = require('mongoose');

const TrainingSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    Name: { type: String, required: true },
    Surname: { type: String, required: true },
    IdNumber: { type: String, required: true },
    LicenseFrequency: { type: String, required: true },
    datelastDone: { type: String, required: true },
    ExpiryDate: { type: String, required: true },
    Status: { type: String, required: true },
    Document: { type: String, required: true }
}, {
    collection: "Training License",
    timestamp: true
});

mongoose.model("Training License", TrainingSchema); 