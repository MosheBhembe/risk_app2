const mongoose = require('mongoose');

require('../Schemas/SHEPolicy');
const SHE_Policy = mongoose.model('SHE POLICY');

require('../Schemas/registrationData');
const Register = mongoose.model("Registration Data");

// create Policy
const create_SHE_policy = async (Request, Response) => {
    try {
        const { shepolicyDocName, shepolicyDocNumber, shePolicyDocType, shePolicyDocReviewDate } = Request.body;
        const userId = Request.user.id;
        const PolicyDoc = Request.file ? Request.file.path : null;
        const user = await Register.findById(userId).select("Email companyId");

        if (!user || user.companyId) {
            return Response.status(400).json({ status: "error", message: "Company ID not found." });
        }

        const companyId = user.companyId;

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
        const userId = Request.user.id;

        if (!userId) {
            return Response.status(400).json({ status: 'error', message: "User not found" });
        }

        const user = await Register.findById(userId);

        if (!user || !user.companyId) {
            return Response.status(400).json({ message: "User or company not found" });
        }

        const SHEPolicyDocs = await SHE_Policy.find({ companyId: user.companyId });

        if (!SHEPolicyDocs) {
            return Response.status(404).json({ message: "No document found" });
        }

        return Response.status(200).json({
            status: "Success",
            message: SHEPolicyDocs
        });

    } catch (error) {
        return Response.status(500).json({ status: 'ERROR', data: error.message });
    }
}

module.exports = {
    create_SHE_policy,
    get_SHE_Policy
}; 