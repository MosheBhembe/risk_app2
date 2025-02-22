const mongoose = require('mongoose');

const InspectionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    PersonResponsible: { type: String, required: true },
    InspectionName: { type: String, required: true },
    Frequecy: { type: String, required: true },
    DateDone: { type: String, requred: true }
}, {
    collection: "Inpsection",
    timestamps: true
});

mongoose.model('Inspection', InspectionSchema); 