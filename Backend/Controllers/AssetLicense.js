const mongoose = require('mongoose');

require('../Schemas/AssetLicense');
const AssetsLicense = mongoose.model("Asset License");

require('../Schemas/registrationData');
const Register = mongoose.model('Registration Data');


const create_asset_license = async (Request, Response) => {
    try {
        const userId = Request.user.id;
        const document = Request.file ? Request.file.path : null;
        const { registration_Number, type, issuedto, issueDate, expiryDate, company } = Request.body;

        if (!userId) {
            return Response.status(401).json({ message: "Unauthorized" });
        }

        const registeredAccount = await Register.findById(userId);
        if (!registeredAccount || !registeredAccount.companyId) {
            return Response.status(401).json({ message: "Unauthorized" });
        }

        const companyId = registeredAccount.companyId;
        const newAssetLicense = AssetsLicense({
            createdBy: userId,
            companyId: companyId,
            RegistrationNumber: registration_Number,
            LicenseType: type,
            IssuedTo: issuedto,
            IssueDate: issueDate,
            ExpiryDate: expiryDate,
            Company: company,
            LicenseCopyUpload: document
        });

        await newAssetLicense.save();
        return Response.status(200).json({
            message: "Asset License Saved"
        });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}


const get_Asset_license = async (Request, Response) => {
    try {
        const userId = Request.user.id;
        if (!userId) {
            return Response.status(400).json({
                message: 'User does not exist'
            });
        }

        const user = await Register.findById(userId);

        if (!user || !user.companyId) {
            return Response.status(404).json({
                message: 'Company Id or user not found'
            })
        }
        const licence = await AssetsLicense.find({ companyId: user.companyId });
        if (!licence.length) {
            return Response.status(404).json({
                message: "No asset License logged"
            });
        }

        return Response.status(200).json({ status: 'ok', data: licence });

    } catch (error) {
        return Response.status(500).json({ error: "error", message: error });
    }
}

module.exports = {
    create_asset_license,
    get_Asset_license
}