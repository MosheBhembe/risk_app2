const mongoose = require('mongoose');
require('../Schemas/Assets');
require('../Schemas/registrationData');
require('../Schemas/Company');

const Assets = mongoose.model('Assets');
const Register = mongoose.model("Registration Data");
// const Company = mongoose.model('Company');

// Create Assets
const CreateAsset = async (Request, Response) => {
    try {
        const { AssetName, AssetType, AssetRegistration, assetModel, year, capacity } = Request.body
        const document = Request.file ? Request.file.path : null;
        const userId = Request.user.id;
        if (!userId) {
            return Response.status(400).json({ message: "User Id is required" });
        }

        const registeredUser = await Register.findById(userId);
        if (!registeredUser || !registeredUser.companyId) {
            return Response.status(404).json({
                message: 'CompanyId and user not found'
            });
        }
        const companyId = registeredUser.companyId;
        const ExistingAsset = await Assets.findOne({ AssetReg: AssetRegistration });
        if (ExistingAsset) return Response.status(400).json({ message: 'Asset already Exists' });

        const newAsset = Assets({
            createdBY: userId,
            companyId,
            AssetName,
            AssetType,
            AssetReg: AssetRegistration,
            AssetModel: assetModel,
            Year: year,
            Capacity: capacity,
            Image: document
        });

        await newAsset.save();
        return Response.status(200).json({ message: 'Asset Added Successful' });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', message: error.message });
    }
}

// getAllAssets 

const GetAllAssets = async (Request, Response) => {
    try {
        const userId = Request.user.id;
        if (!userId) {
            return Response.status(400).json({ message: 'User or company not found' });
        }

        const user = await Register.findById(userId);

        if (!user || !user.companyId) {
            return Response.status(400).json({ message: 'User or company not found' });
        }
        const assets = await Assets.find({ companyId: user.companyId });

        if (!assets.length) {
            return Response.status(400).json({ message: 'No assets found' });
        }
        return Response.status(200).json(assets);

    } catch (error) {
        return Response.status(500).json({ status: 'ERROR', data: error.message });
    }
}
//  Delete Asset

const DeleteAsset = async (Request, Response) => {
    try {
        const { AssetReg } = Request.body;
        const asset = await Assets.findOneAndDelete({ AssetReg });

        if (!asset) return Response.status(400).json({ message: 'Asset Not Found' })
        return Response.status(200).json({ message: 'Asset Deleted' });

    } catch (error) {
        return Response.status(500).json({ status: 'Error', data: error.message });
    }
}

// Update Asset 

const UpdateAsset = async (Request, Response) => {
    try {
        const { AssetName, AssetType, AssetReg } = Request.body;

        const updatedAssets = await Assets.findOneAndUpdate(
            { AssetReg },
            { AssetName, AssetType },
            { new: true, runValidators: true }
        );

        if (!updatedAssets) {
            return Response.status(404).json({ message: 'Asset Not found' });
        }

        return Response.status(200).json({ message: 'Asset Updated' });
    } catch (error) {
        return Response.status(500).json({ status: 'Error', error: error.message });
    }
}

module.exports = { CreateAsset, DeleteAsset, GetAllAssets, UpdateAsset }; 