const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({
    to: String,
    from: String,
    subject: String,
    text: String,
    sentAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'emails'
});

mongoose.model('emails', emailSchema);

