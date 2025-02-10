const mongoose = require('mongoose');
require('../Schemas/AssetLicense');

const AssetsLicense = mongoose.model("Asset License");
const create_asset_license = async (Request, Response) => {
    try {

        const userId = Request.user.Id;
        const document = Request.file ? Request.file.path : null;
        const { registrationNum, licenseNumber, licenseFreq, expiryDate, status } = Request.body;

        const newAssetLicense = AssetsLicense({
            reatedBy: userId,
            RegistrationNumber: registrationNum,
            LicenseNumber: licenseNumber,
            LicenseFrequency: licenseFreq,
            ExpireDate: expiryDate,
            Status: status,
            Document: document
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
        const userId = Request.user.Id;
        const asset_license = await AssetsLicense({ createdBy: userId });

        if (!asset_license) return Response.status(400).json({ message: 'No Asset license Found' });
        return Response.status(200).json({ assets: asset_license });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}

module.exports = {
    create_asset_license,
    get_Asset_license
}