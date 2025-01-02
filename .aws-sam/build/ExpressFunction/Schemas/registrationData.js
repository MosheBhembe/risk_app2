const mongoose = require('mongoose');

const registrationDataSchema = mongoose.Schema({
    Names: String,
    Surname: String,
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: String,
    ConfirmPassword: String
}, {
    collection: "Registration Data"
});

mongoose.model('Registration Data', registrationDataSchema);