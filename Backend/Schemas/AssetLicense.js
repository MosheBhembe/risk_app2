const mongoose = require('mongoose');

const AssetLicenseSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    RegistrationNumber: { type: String, required: true },
    LicenseNumber: { type: String, required: true },
    LicenseFrequency: { type: String, required: true },
    ExpireDate: { type: String, required: true },
    Status: { type: String, required: true },
    Document: { type: String, required: true }
}, {
    collection: "Asset License",
    timestamp: true
})

mongoose.model("Asset License", AssetLicenseSchema); 