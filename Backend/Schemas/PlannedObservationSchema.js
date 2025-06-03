const mongoose = require('mongoose');


const PlannedObservation = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    EmployeeName: { type: [String], required: true },
    Section: { type: String, required: true },
    ObservationDate: { type: String, required: true },
    TaskObserved: { type: String, required: true },
    Occupation: { type: String, required: true },
    NameOfObserver: { type: String, required: true },
    OccupationOfObserver: { type: String, required: true },
    Enformed: { type: [String], required: true },
    Procedure: { type: [String], required: true },
    ReasonForObservation: { type: [String], required: true },
    Adherence: { type: [String], required: true },
    ObservedPractices: { type: [String], required: true },
    StandardPractices: { type: [String], required: true },
    RiskRanking: { type: [String], required: true },
    ProposedControls: { type: [String], required: true },
    CommentDescription: { type: String, required: true },
    DateSigning: { type: String, required: true }
}, {
    Timestamp: true,
    collection: "Planned Observsion"
});

mongoose.model('Planned Observsion', PlannedObservation); 