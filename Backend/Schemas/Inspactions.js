const mongoose = require('mongoose');

const InspectionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    Registration: { type: String, required: true },
    InspectionDate: { type: String, required: true },
    InspectorName: { type: String, required: true },
    InspectionType: { type: [String], required: true },
    Issues: { type: String, required: true },
    IssuesDescription: { type: String, required: true },
    Upload: { type: String, required: true }
}, {
    collection: "Inpsection",
    timestamps: true
});

mongoose.model('Inspection', InspectionSchema); 