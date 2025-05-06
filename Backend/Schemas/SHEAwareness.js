const mongoose = require('mongoose');

const SHEAwareness = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    compnayId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    DocumentNumber: { type: String, required: true },
    DocumentName: { type: String, required: true },
    AwarenessType: { type: [String], required: true },
    ReviewDate: { type: String, required: true },
    Document: { type: String, required: true }
}, {
    collection: "SHE AWARENESS",
    timestamps: true
})

mongoose.model("SHE AWARENESS", SHEAwareness); 