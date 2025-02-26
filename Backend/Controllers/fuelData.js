const mongoose = require('mongoose');
const transporter = require('../Middleware/nodemailerconfig');
const companyEmail = require('../Middleware/companyEmail');

require('../Schemas/ConsumptionData');
const consumptionData = mongoose.model('consumptionData');

require('../Schemas/registrationData');
const Register = mongoose.model('Registration Data');

require('../Schemas/emails');
const Email = mongoose.model('emails');

const fuel_data = async (Request, Response) => {
    try{
    const { NameSurname, regNumber, assetType } = Request.body;
    const image = Request.file ? Request.file.path : null;

    const user_email = await Register.findOne().select('Email');
    const userId = Request.user.Id;

    if (!image) {
        return Response.status(400).json({ message: 'No Image uploaded' });
    }

    const newFuelData = consumptionData({
        createdBy: userId,
        NameSurname,
        Registration: regNumber,
        AssetType: assetType,
        Image: image

    })
    await newFuelData.save();
    Response.status(200).json({
        message: 'Data sent'
    })

    // Create the email body sructure

    } catch (error) {
        console.log('Error saving fuel data:', error);
        res.status(500).send({ status: 'error', data: error.message });
    }
}


const getAllfuelData = async (Request, Response) => {
    try {
        const userId = Request.user.id;
        if (!userId) return Response.status(404).json({
            message: 'User not found'
        })

        const user = await Register.findById(userId);
        if (!user || user.companyId) {
            return Response.status(404).json({ message: "user or company does not exist" });
        }

        const fuelData = await consumptionData.find({ companyId: user.companyId });
        if (!fuelData.length) return Response.status(400).json({
            message: "no fuel data log found"
        });
        return Response.status(200).json(fuelData);
    } catch (error) {
        console.log(error);
        return Response.status(500).json({ message: "Server Error" });
    }
}
module.exports = { fuel_data, getAllfuelData }; 