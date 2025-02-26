const mongoose = require('mongoose');

const reportDataSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    Names: { type: String, required: true },
    DateTime: { type: Date, required: true },
    selectedOptions: { type: [String], required: true },
    Place: { type: String, required: true },
    Description: { type: String, required: true },
    Equipment: { type: String, required: true },
    PeopleInvolved: { type: String, required: true }
}, {
    collection: 'ReportData'
});

mongoose.model('ReportData', reportDataSchema);