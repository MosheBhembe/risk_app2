const mongoose = require('mongoose');

const Company = mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true,
    collection: "Company"
});

mongoose.model("Company", Company); 