const mongoose = require('mongoose');

require('../Schemas/SHE');

const SHE = mongoose.model("SHE Documentation");

const createsheDocument = async (Request, Response) => {
    try {
        const { docNumber, docName, docType, docReview } = Request.body;
        const document = Request.file ? Request.file.path : null;
        const userId = Request.user.Id;

        const newSHEDoc = SHE({
            createdBy: userId,
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
        const userId = Request.user.Id;
        const SHEDoc = await SHE.find({ createdBy: userId });
        if (!SHEDoc) return Response.status(404).json({
            message: "No documents found"
        });
        return Response.status(200).json({
            status: "Successful",
            message: SHEDoc
        })
    } catch (error) {

    }
}
module.exports = {
    createsheDocument,
    getSHEDocument
}; 