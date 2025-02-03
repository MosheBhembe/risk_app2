const mongoose = require('mongoose');

const reportDataSchema = mongoose.Schema({
    name: String,
    email: { type: String },
    location: String,
    assets: String,
    dateTime: { type: Date, reqiured: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    collection: 'ReportData'
});

mongoose.model('ReportData', reportDataSchema);