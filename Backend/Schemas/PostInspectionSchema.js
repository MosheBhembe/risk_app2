const mongoose = require('mongoose');

const PostInspectionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    VehicleRegistration: { type: [String], required: true },
    DateTime: {type: String, required: true}, 
    Trailor: { type: String },
    NoLoss: { type: Boolean, required: true },
    FleetAndFuelCard: { type: Boolean, required: true },
    WindowsAreClosed: { type: Boolean, required: true },
    CleanCar: {type: Boolean, required: true}, 
    TailLightsCondition: { type: Boolean, required: true },
    ParkBrake: { type: Boolean, required: true },
    DashboardWarnings: { type: Boolean, required: true },
    DocumentCompleted: { type: Boolean, required: true },
    NoVisualDamage: { type: Boolean, required: true },
    Leaks: { type: Boolean, required: true },
    ProductLeaks: { type: Boolean, required: true },
    DustCover: {type: Boolean, required: true}, 
    BatteryCover: { type: Boolean, required: true },
    MirrorsAndCovers: { type: Boolean, required: true },
    VisualNewDamage: { type: Boolean, required: true },
    Tyres: { type: Boolean, required: true },
    WheelNuts: { type: Boolean, required: true },
    WindScreenAndWipers: { type: Boolean, required: true },
    RegistrationPlate: { type: Boolean, required: true },
    ChevronAndPumbers: { type: Boolean, required: true },
    ReflectorTapes: { type: Boolean, required: true },
    Label: { type: Boolean, required: true },
    OrangeDimond: { type: Boolean, required: true },
    NumberPlateLights: { type: Boolean, required: true },
    MarkerLights: { type: Boolean, required: true },
    TailLights: { type: Boolean, required: true },
    HeadLights: { type: Boolean, required: true },
    Fire: { type: Boolean, required: true },
    Cones: { type: Boolean, required: true },
    ShocksBlocks: { type: Boolean, required: true },
    Comments: { type: String },
    Signature: [
        {
            Source: { type: String, required: true },
            value: { type: String, required: true }
        }
    ]
}, {
    Timestamp: true,
    collection: "Post Inspection"
})

mongoose.model("Post Inspection", PostInspectionSchema)