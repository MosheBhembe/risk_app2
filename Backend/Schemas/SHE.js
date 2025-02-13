const mongoose = require('mongoose');

const SHEDocumentSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyId: { type: mongoose.Schema.Types.ObjectId, reef: "Company" },
    DocumentNumber: { type: String, required: true },
    DocumentName: { type: String, required: true },
    DocumentType: { type: String, required: true },
    ReviewDate: { type: String, required: true },
    Document: { type: String, required: true }
}, {
    collection: "SHE Documentation",
    timestamps: true
})

mongoose.model("SHE Documentation", SHEDocumentSchema); 
