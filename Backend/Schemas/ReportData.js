const mongoose = require('mongoose');

const reportDataSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    location: String,
    assets: String,
    dateTime: { type: Date, reqiured: true }
}, {
    collection: 'ReportData'
});

mongoose.model('ReportData', reportDataSchema);