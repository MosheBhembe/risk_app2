const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
    createdBY: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    AssetName: { type: String, required: true },
    AssetType: { type: String, required: true },
    AssetReg: { type: String, required: true, unique: true },
    AssetModel: { type: String, requred: true },
    Year: { type: Number, required: true },
    Capacity: { type: String, required: true },
    Image: { type: String }
}, {
    collection: "Assets",
    timestamp: true
})

mongoose.model("Assets", AssetSchema); 