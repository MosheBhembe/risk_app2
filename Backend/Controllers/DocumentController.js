const mongoose = require('mongoose');

require('../Schemas/registrationData');
const Register = mongoose.model("Registration Data");

const createDocument = async (request, Response) => {
    const { } = Request.body
    const userId = Request.user.id
    const Docs = Request.file ? Request.file.path : null;
    const user = await Register.findById(userId).select('Email companyId');

    if (!user || !user.companyId) {
        return Response.status(400).json({ status: "error", message: "user or compnayId  not found" });
    }

    const companyId = user.companyId;
    try {
        const newDocument = Documents({

        })
        await newDocument.save();
        Response.status(200).json({ status: 'ok', message: "Document Uploaded Successfully" });
    } catch (error) {
        Registeresponse.status(500).json({ status: "error", data: error.message });
    }
}

const fetchAllDocs = async (Request, Response) => {

}
module.exports = { createDocument, fetchAllDocs }; 