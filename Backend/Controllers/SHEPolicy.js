const mongoose = require('mongoose');

require('../Schemas/SHEPolicy')

const SHE_Policy = mongoose.model('SHE POLICY');

// create Policy
const create_SHE_policy = async (Request, Response) => {
    try {
        const { shepolicyDocName, shepolicyDocNumber, shePolicyDocType, shePolicyDocReviewDate } = Request.body;
        const userId = Request.user.Id;
        const PolicyDoc = Request.file ? Request.file.path : null;

        const newPolicy = SHE_Policy({
            createdBy: userId,
            DocumentNumber: shepolicyDocNumber,
            DocumentName: shepolicyDocName,
            DocumentType: shePolicyDocType,
            ReviewDate: shePolicyDocReviewDate,
            Document: PolicyDoc
        })

        await newPolicy.save();
        return Response.status(200).json({ message: "Data saved Successful" });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}


const get_SHE_Policy = async (Request, Response) => {
    try {
        const userId = Request.user.Id;
        const shePolicy = await SHE_Policy.find({ createdBy: userId });

        if (!shePolicy) return Response.status(400).json({
            message: "No Policy Found"
        })

        return Response.status(200).json({
            status: "success",
            message: shePolicy
        });

    } catch (error) {
        return Response.status(500).json({ status: 'ERROR', data: error.message });
    }
}

module.exports = {
    create_SHE_policy,
    get_SHE_Policy
}; 