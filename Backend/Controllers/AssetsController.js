const mongoose = require('mongoose');
require('../Schemas/Assets');

const Assets = mongoose.model('Assets');

// Create Assets
const CreateAsset = async (Request, Response) => {
    try {
        const { AssetName, AssetType, AssetRegistration } = Request.body
        const image = Request.file ? Request.file.path : null;
        const userId = Request.user.Id;

        const ExistingAsset = await Assets.findOne({ AssetReg: AssetRegistration });

        if (ExistingAsset) return Response.status(400).json({ message: 'Asset already Exists' });

        const newAsset = Assets({
            createdBY: userId,
            AssetName,
            AssetType,
            AssetReg: AssetRegistration,
            Image: image
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
        const assets = await Assets.find();

        if (assets.length === 0) return Response.status(400).json({ message: 'No Assets Found' });
        return Response.status(200).json({ assets: assets });

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