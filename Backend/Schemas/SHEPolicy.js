const mongoose = require('mongoose');

const SHEPolicySchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    DocumentNumber: { type: String, required: true },
    DocumentName: { type: String, required: true },
    DocumentType: { type: String, required: true },
    ReviewDate: { type: String, required: true },
    Document: { type: String, required: true }
}, {
    collection: "SHE POLICY",
    timestamps: true
})

mongoose.model("SHE POLICY", SHEPolicySchema); 
