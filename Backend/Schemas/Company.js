const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true,
    collection: "Company"
});

mongoose.model("Company", CompanySchema); 