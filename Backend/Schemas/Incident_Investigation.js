const mongoose = require('mongoose');

const InvestigationSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    IncidentNumber: { type: mongoose.Schema.Types.ObjectId, ref: 'ReportData', required: true },
    InvestigatorName: { type: String, required: true },
    InvestigationTeam: { type: String, required: true },
    IncidentDate: { type: String, required: true },
    ReportedBy: { type: String, required: true },
    IncidentType: { type: mongoose.Schema.Types.ObjectId, ref: "ReportData", required: true }, 
    IncidentDescription: { type: String, required: true }, 
    Activity: {type: String, required: true}, 
    InjuredPerson: {type: String, required: true}, 
    Witnesses: {type: String, required: true}, 
    ImmediateAction: {type: String, required: true}, 
    Company: {type: String, required: true}, 
    Cause: {type: String, required: true}, 
    Images: {type: String, required: true}
}, {
    collection: "Investigation",
    timestamps: true
})

mongoose.model("Investigation", InvestigationSchema); 