const mongoose = require('mongoose');

require('../Schemas/SHE');
const SHE = mongoose.model("SHE Documentation");

require('../Schemas/registrationData');
const Register = mongoose.model("Registration Data");

const createsheDocument = async (Request, Response) => {
    try {
        const { docNumber, docName, docType, docReview } = Request.body;
        const document = Request.file ? Request.file.path : null;
        const userId = Request.user.id;
        const user = await Register.findById(userId).select("Email companyId");

        if (!user || !user.companyId) {
            return Response.status(400).json({ status: "error", message: "compay id cannot be found" })
        }

        const companyId = user.companyId;

        const newSHEDoc = SHE({
            createdBy: userId,
            companyId: companyId,
            DocumentNumber: docNumber,
            DocumentName: docName,
            DocumentType: docType,
            ReviewDate: docReview,
            Document: document
        })

        await newSHEDoc.save();
        return Response.status(200).json({ message: "data saved Successfully" })
    } catch (error) {
        return Response.status(500).json({
            status: "error",
            message: error.message
        })
    }
}


const getSHEDocument = async (Request, Response) => {
    try {
        const userId = Request.user.id;
        if (!userId) {
            return Response.status(400).json({ status: "error", message: "User ID cannot be found" });
        }
        const user = await Register.findById(userId);
        if (!user || !user.companyId) {
            return Response.status(400).json({ message: "User or company not found" });
        }

        const SHEDoc = await SHE.find({ companyId: user.companyId });
        if (!SHEDoc) return Response.status(404).json({
            message: "No documents found"
        });
        return Response.status(200).json({
            status: "Successful",
            message: SHEDoc
        })
    } catch (error) {
        return Response.status(500).json({ status: "error", data: error.message });
    }
}
module.exports = {
    createsheDocument,
    getSHEDocument
}; 