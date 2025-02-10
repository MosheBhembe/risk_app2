const mongoose = require('mongoose');

const reportDataSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    selectedOptions: { type: [String], required: true },
    assets: { type: String, required: true },
    dateTime: { type: Date, reqiured: true },
}, {
    collection: 'ReportData'
});

mongoose.model('ReportData', reportDataSchema);