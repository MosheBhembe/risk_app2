const mongoose = require('mongoose');

const InspectionSchema = mongoose.Schema({
    PersonResponsible: { type: String, required: true },
    InspectionName: { type: String, required: true },

}, {
    collection: "Inpsection",
    timestamp: true
});

mongoose.model('Inspection', InspectionSchema); 