const mongoose = require('mongoose');

const tyreChangeSchema = mongoose.Schema({
    Registration: String,
    Burst: String,
    TimeandDate: String
}, {
    collection: 'Tyre change report'
});

mongoose.model('Tyre change report', tyreChangeSchema); 
