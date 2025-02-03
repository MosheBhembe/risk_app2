const mongoose = require('mongoose');

const DriverSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    Surname: {
        type: String,
        required: true,
        trim: true
    },
    IDNumber: {
        type: String,
        required: true,
        unique: true,
    },

    LicenceType: {
        type: String,
        required: true,
        enum: ["Code 8", "Code 10", "Code 14", "Heavy Vehicle"]
    },
    LicenceRegistrationDate: {
        type: Date,
        required: true
    },
    LicenceExpiryDate: {
        type: Date,
        required: true

        // type: Date,
        // required: true, 
        // validator: function(value){
        //     return value > new Date();
        // }
    },
    Image: String,
}, { timestamps: true });

const Driver = mongoose.model("Driver", DriverSchema); 