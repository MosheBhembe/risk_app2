const mongoose = require('mongoose');

const AssetLicenseSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    RegistrationNumber: { type: String, required: true },
    LicenseType: { type: [String], required: true },
    IssuedTo: { type: String, required: true },
    IssueDate: { type: String, required: true },
    ExpiryDate: { type: String, required: true },
    Company: { type: String, required: true },
    LicenseCopyUpload: { type: String, required: true }
}, {
    collection: "Asset License",
    timestamp: true
})

mongoose.model("Asset License", AssetLicenseSchema); 