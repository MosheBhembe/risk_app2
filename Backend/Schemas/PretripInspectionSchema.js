const mongoose = require('mongoose');


const PreTripInspection = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    EmployeeName: { type: String, required: true },
    InspectionDate: { type: String, required: true },
    InspectionStartTime: { type: String, required: true },
    LineManagerName: { type: String, required: true },
    WaterLevel: { type: Boolean, required: true },
    EnginOilLevel: { type: Boolean, required: true },
    ClutchFluitLevel: { type: Boolean, required: true },
    SteeringFluitLevel: { type: Boolean, required: true },
    WindScreenWasherLevel: { type: Boolean, required: true },
    NoDamageToVehicle: { type: Boolean, required: true },
    WindScreenIsClean: { type: Boolean, required: true },
    WipersInGoodCondition: { type: Boolean, required: true },
    LightAndReflectors: { type: Boolean, required: true },
    LightsAndReflectorsClean: { type: Boolean, required: true },
    TyresPressuredNoDamage: { type: Boolean, required: true },
    NoLeaks: { type: Boolean, required: true },
    Mirrors: { type: Boolean, required: true },
    OrangeDiamond: { type: Boolean, required: true },
    NumberPlates: { type: Boolean, required: true },
    Chevrons: { type: Boolean, required: true },
    BatteryCover: { type: Boolean, required: true },
    WheelNutsMarkers: { type: Boolean, required: true },
    DustCovers: { type: Boolean, required: true },
    Valves: { type: Boolean, required: true },
    FifthWheel: { type: Boolean, required: true },
    VisualLeaks: { type: Boolean, required: true },
    SussiPypes: { type: Boolean, required: true },
    AirLeaks: { type: Boolean, required: true },
    Placards: { type: Boolean, required: true },
    LicenseDisk: { type: Boolean, required: true },
    SLP: { type: Boolean, required: true },
    FirePermit: { type: Boolean, required: true },
    HeadLights: { type: Boolean, required: true },
    ParkLights: { type: Boolean, required: true },
    HazardLights: { type: Boolean, required: true },
    TailLights: { type: Boolean, required: true },
    NumberPlateLights: { type: Boolean, required: true },
    BrakeLights: { type: Boolean, required: true },
    WorkLights: { type: Boolean, required: true },
    ReverseLights: { type: Boolean, required: true },
    Brakes: { type: Boolean, required: true },
    Reflective: { type: Boolean, required: true },
    SafetyShoes: { type: Boolean, required: true },
    Musk: { type: Boolean, required: true },
    HardHat: { type: Boolean, required: true },
    Gloves: { type: Boolean, required: true },
    Vest: { type: Boolean, required: true },
    Shocks: { type: Boolean, required: true },
    Torch: { type: Boolean, required: true },
    ValidFireEx: { type: Boolean, required: true },
    Spill: { type: Boolean, required: true },
    FirstAid: { type: Boolean, required: true },
    SelfStanding: { type: Boolean, required: true },
    EarthCable: { type: Boolean, required: true },
    SeatBelts: { type: Boolean, required: true },
    Hooter: { type: Boolean, required: true },
    InhouseLights: { type: Boolean, required: true },
    DangerousGoods: { type: Boolean, required: true },
    Tremcard: { type: Boolean, required: true },
    WheelSteering: { type: Boolean, required: true },
    LoadDocuments: { type: Boolean, required: true },
    ShipmentLog: { type: Boolean, required: true },
    DeliverySequence: { type: Boolean, required: true },
    JourneyPlan: { type: Boolean, required: true },
    FAN: { type: Boolean, required: true },
    BOL: { type: Boolean, required: true },
    EnoughFuel: { type: Boolean, required: true },
    TollCard: { type: Boolean, required: true },
    TestMeter: { type: Boolean, required: true },
    DateAndTime: { type: Boolean, required: true },
    SOP: { type: Boolean, required: true },
    ID: { type: Boolean, required: true },
    MedicalCert: { type: Boolean, required: true },
    RoutePlan: { type: Boolean, required: true },
    HandOver: { type: Boolean, required: true },
    LOBCheck: { type: Boolean, required: true },
    Comments: { type: String, required: true },
    InspectionSignature: { type: String, required: true },
}, {
    Timestamp: true,
    collection: "Pre Trip"
})

mongoose.model("Pre Trip", PreTripInspection); 