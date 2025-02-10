const mongoose = require('mongoose');

const registrationDataSchema = mongoose.Schema({
    Name: String,
    Surname: String,
    IDNumber: { type: String, required: true },
    Role: { type: String, required: true },
    Company: { type: String, required: true },
    CellPhone: { type: String, required: true },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Gender: { type: String, required: true },
    Password: String,
}, {
    collection: "Registration Data",
    timestamp: true
});

mongoose.model('Registration Data', registrationDataSchema);