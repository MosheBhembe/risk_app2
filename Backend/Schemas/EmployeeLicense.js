const mongoose = require('mongoose');

const LicenseSchemas = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    NameAndSurname: { type: String, required: true },
    Status: { type: String, required: true },
    LicenseType: { type: String, required: true },
    LicenseFrequency: { type: String, required: true },
    LastUpdated: { type: String, required: true },
    ExpiryDate: { type: Date, required: true },
    lastNotification: { type: Date, required },
    Attachment: { type: String, required: true }
}, {
    collection: "Employee License",
    timestamps: true
});

mongoose.model("Employee License", LicenseSchemas)