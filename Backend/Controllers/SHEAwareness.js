const mongoose = require('mongoose');

require('../Schemas/SHEAwareness');
const SHEAwareness = mongoose.model("SHE AWARENESS");

require('../Schemas/registrationData');
const Register = mongoose.model("Registration Data");

const createSHEAwarenessDocument = async (Request, Response) => {
    try {
        const { documentNumber, documentName, awarenessType, reviewDate } = Request.body;
        const document = Request.file ? Request.file.path : null;
        const userId = Request.user.id;
        const user = await Register.findById(userId).select("Email companyId");

        if (!user || !user.companyId) {
            return Response.status(400).json({ message: "User not found" });
        }

        const companyId = user.companyId;

        const newSHEAwareness = SHEAwareness({
            createdBy: userId,
            companyId: companyId,
            DocumentNumber: documentNumber,
            DocumentName: documentName,
            AwarenessType: awarenessType,
            ReviewDate: reviewDate,
            Document: document
        })
        newSHEAwareness.save();
        return Response.status(200).json({ message: "Data saved" })
    } catch (error) {
        console.log(error)
    }
}


const getSheAwarenessDocument = async (Request, Response) => {
    try {
        const userId = Request.user.id;

        if (!userId) {
            return Response.status(404).json({
                message: 'User not found'
            })
        }
        const user = await Register.findById(userId);
        if (!user || !user.companyId) {
            return Response.status(404).json({
                message: "No user or company found"
            })
        }

        const AwarenessDocs = await SHEAwareness.find({ companyId: user.companyId });

        if (!AwarenessDocs) {
            return Response.status(404).json({
                message: "No Awareness Document found"
            });
        }

        return Response.status(200).json(AwarenessDocs);

    } catch (error) {
        return Response.status(500).json({
            message: "Server Error"
        });
    }
}
module.exports = { createSHEAwarenessDocument, getSheAwarenessDocument }