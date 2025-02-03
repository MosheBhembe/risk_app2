const mongoose = require('mongoose');

const registrationDataSchema = mongoose.Schema({
    Name: String,
    Surname: String,
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Role: { type: String, required: true },
    Password: String,
    ConfirmPassword: String
}, {
    collection: "Registration Data"
});

mongoose.model('Registration Data', registrationDataSchema);