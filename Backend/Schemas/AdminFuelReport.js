const mongoose = require('mongoose');

const AdminFuelReportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    registration: { type: String, required: true },
    fuelType: { type: String, required: true },
    date: { type: String, required: true },
    km: { type: String, required: true },
    attachment: { type: String, required: true }
}, {
    collection: "Admin Fuel",
    timestamps: true
})


mongoose.model("Admin Fuel", AdminFuelReportSchema); 