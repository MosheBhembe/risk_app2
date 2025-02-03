const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
    createdBY: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    AssetName: { type: String, required: true },
    AssetType: { type: String, required: true, enum: ['Truck', 'Vehicle', 'TLB', 'CAT'] },
    AssetReg: { type: String, required: true, unique: true },
    Image: { type: String }
}, {
    collection: "Assets",
    timestamp: true
})

mongoose.model("Assets", AssetSchema)