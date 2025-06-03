const mongoose = require('mongoose');

require('../Schemas/registrationData');
const Register = mongoose.model("Registration Data");

require('../Schemas/PlannedObservationSchema');
const Observation = mongoose.model('Planned Observsion');

const createPlannedObservationReport = async (Request, Response) => {
    try {
        const { employeeName, section, observationDate, taskObserved, occupation, nameofObserver, enformed, procedure, reason, adherence, observed, standard, risk, proposed, comments, date } = Request.body;
        const userId = Request.user.id;
        const user = await Register.findById(userId);
        const companyId = user.companyId;

        if (!userId || !companyId) {
            return Response.status(404).json({
                message: "User or email company could not be found"
            });
        }

        const newObservation = Observation({
            userId,
            companyId,
            EmployeeName: employeeName,
            Section: section,
            ObservationDate: observationDate,
            TaskObserved: taskObserved,
            Occupation: occupation,
            NameOfObserver: nameofObserver,
            OccupationOfObserver: nameofObserver,
            Enformed: enformed,
            Procedure: procedure,
            ReasonForObservation: reason,
            Adherence: adherence,
            ObservedPractices: observed,
            StandardPractices: standard,
            RiskRanking: risk,
            ProposedControls: proposed,
            CommentDescription: comments,
            DateSigning: date
        })

        await newObservation.save();
        return Response.status(200).json({
            status: 'ok', message: "Data Saved"
        });

    } catch (err) {
        return Response.status(500).json({ status: "error", data: err.message });
    }
}

const getPlannedObservation = async (Request, Response) => {
    try {
        const userId = Request.user.id;
        if (!userId) {
            return Response.status(400).json({
                status: 'error', message: "User ID is required",
            })
        }

        const user = await Register.findById(userId);
        if (!user || !user.companyId) {
            return Response.status(400).json({
                message: 'User or company not found'
            })
        }

        const observationReports = await Observation.find({ companyId: user.companyId })

        if (!observationReports.length) {
            return Response.status(404).json({ message: "No Observation Reports found" });
        }

        console.log("observation Reports", observationReports);
        return Response.status(200).json({
            status: 'ok', message: observationReports
        });

    } catch (err) {
        return Response.status(500).json({ status: "error", message: err.message });
    }
}
module.exports = { createPlannedObservationReport, getPlannedObservation }; 