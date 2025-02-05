const mongoose = require('mongoose');

const registrationDataSchema = mongoose.Schema({
    // companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    Name: String,
    Surname: String,
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Role: { type: String, required: true },
    Company: { type: String, required: true },
    Password: String,
}, {
    collection: "Registration Data",
    timestamp: true
});

mongoose.model('Registration Data', registrationDataSchema);