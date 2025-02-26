const mongoose = require('mongoose');

const registrationDataSchema = mongoose.Schema({
    Name: String,
    Surname: String,
    IDNumber: { type: String, required: true, unique: true },
    Role: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    CellPhone: { type: String, required: true },
    Email: {
        type: String,
        required: false,
        unique: true, 
        sparse: true
    },
    Gender: { type: String, required: true },
    Password: String,
}, {
    collection: "Registration Data",
    timestamps: true
});

mongoose.model('Registration Data', registrationDataSchema);