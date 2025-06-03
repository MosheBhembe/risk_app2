const mongoose = require('mongoose');


require('../Schemas/registrationData');
const Register = mongoose.model('Registration Data');

require('../Schemas/PostInspectionSchema');
const PostInspection = mongoose.model('Post Inspection');

const createPostInspection = async (Request, Response) => {
    try {
        const { registration, dateTime, clean, trailor, noLoss, fleetAndFuel, windowsAreClosed, tailLightCondition, parkingBrake, dashboardWarning, documentCompleted, noVisualDamage, leaks, productLeaks, dustCovers, batteryCover, mirrorsAndCovers, newDamage, tyres, wheelNuts, windScreen, registrationPlate, chevronandPumbers, reflectorTapes, label, orangeDimond, numberPlateLights, markerLights, tailLights, headLights, fire, cones, shocksAndBlocks, comments, signature } = Request.body;
        const userId = Request.user.id;

        if (!user) {
            console.log("UserId is required");
            return Response.status(400).json({ status: 'error', message: "No User Found" })
        }

        const user = await Register.findById(userId);
        const companyId = user.companyId;

        if (!user || !companyId) {
            console.log("no Data found")
            return Response.status(404).json({
                message: "User or Data not found"
            })
        }

        const newPostInspection = await PostInspection({
            userId,
            companyId,
            VehicleRegistration: registration,
            DateTime: dateTime, 
            Trailor: trailor,
            NoLoss: noLoss,
            FleetAndFuelCard: fleetAndFuel,
            WindowsAreClosed: windowsAreClosed,
            CleanCar: clean, 
            TailLightsCondition: tailLightCondition,
            ParkBrake: parkingBrake,
            DashoardWarnings: dashboardWarning,
            DocumentCompleted: documentCompleted,
            NoVisualDamage: noVisualDamage,
            Leaks: leaks,
            ProductLeaks: productLeaks,
            DustCover: dustCovers,
            BatteryCover: batteryCover,
            MirrorsAndCovers: mirrorsAndCovers,
            VisualNewDamage: newDamage,
            Tyres: tyres,
            WheelNuts: wheelNuts,
            WindScreenAndWipers: windScreen,
            RegistrationPlate: registrationPlate,
            ChevronAndPumbers: chevronandPumbers,
            ReflectorTapes: reflectorTapes,
            Label: label,
            OrangeDimond: orangeDimond,
            NumberPlateLights: numberPlateLights,
            MakerLights: markerLights,
            TailLights: tailLights,
            HeadLight: headLights,
            Fire: fire,
            Cones: cones,
            ShocksBlocks: shocksAndBlocks,
            Comments: comments,
            Signature: signature
        })

        await newPostInspection.save();
        return Response.status(200).json({
            status: 'ok',
            message: "data has been saved"
        });
    } catch (err) {
        return Response.status(500).json({ status: 'error', message: error.message });
    }
}

const getPostInspection = async (Request, Response) => {
    try {
        const userId = Request.user.id;
        if (!userId) {
            return Response.status(400).json({
                status: 'error', message: "User ID is required"
            });
        }

        const user = await Register.findById(userId);
        const companyId = user.companyId;

        if (!user || !companyId) {
            return Response.status(404).json({
                message: 'User or company not found'
            })
        }

        const PostTripInspection = await PostInspection.find({ companyId: companyId });

        if (!PostTripInspection) {
            return Response.status(404).json({
                message: 'No post trip inspections logged'
            })
        }

        console.log("Post-Trip inspections", PostTripInspection);
        return Response.status(200).json({
            status: 'ok',
            message: PostTripInspection
        })

    } catch (error) {
        console.log(error.message);
        return Response.status(500).json({ status: 'error', message: error.message })
    }
}

module.exports = { createPostInspection, getPostInspection }; 