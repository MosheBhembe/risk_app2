const mongoose = require('mongoose');

const Manager = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Name: { type: String, required: true },
    Surname: { type: String, required: true },
    Identity: { type: String, required: true },
    Email: { type: String, required: true },
    Company: { type: String, required: true },
    Role: { type: String, required: true },
    Password: { type: String, required: true }
}, {
    collection: 'Manager Register',
    timestamp: true
});

mongoose.model("Manager Register", Manager); 