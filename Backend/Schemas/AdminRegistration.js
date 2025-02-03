const mongoose = require('mongoose');

const Admin = mongoose.Schema({
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Name: { type: String, required: true },
    Surname: { type: String, required: true },
    Identity: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Company: { type: String, required: true },
    Role: { type: String, required: true },
    Password: { type: String, required: true }
}, {
    collection: "Admin Register",
    TimeStamp: true
});


mongoose.model("Admin Register", Admin); 