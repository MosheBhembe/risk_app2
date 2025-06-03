const mongoose = require('mongoose');

require('../Schemas/PretripInspectionSchema');
const PreInspection = mongoose.model('Pre Trip');

require('../Schemas/registrationData');
const Register = mongoose.model('Registration Data');


const createPreInspection = async (Request, Response) => {
    try {
        const {
            employeeName,
            inspectionDate,
            inspectionStart,
            lineManager,
            water,
            engine,
            clutch,
            steering,
            windscreenWasher,
            noDamage,
            cleanWindscreen,
            wipers,
            lightsReflectors,
            cleanLightsRefectors,
            tyrePressure,
            noLeaks,
            mirrors,
            orangeDimond,
            numberPlates,
            chevron,
            batteryCover,
            wheelNutMarkers,
            dustCovers,
            valves,
            wheelFive,
            visualLeaks,
            sussi,
            airLeaks,
            placards,
            licenseDisk,
            slp,
            firePermit,
            headLights,
            parkLights,
            hazardsLights,
            tailLights,
            numberPlateLights,
            brakeLights,
            workLights,
            reverseLights,
            brakes,
            reflective,
            safetyShoes,
            must,
            hardHat,
            gloves,
            vest,
            shocks,
            torch,
            validExstinguisher,
            spill,
            firstAid,
            selfStanding,
            earthCable,
            seatBelts,
            hooter, inhouseLights,
            dangerousGoods,
            tremcard,
            steeringwheel,
            loadedDocuments,
            shipmentLog,
            deliverySequence,
            journeyPlan,
            fan,
            bol,
            enoughFuel,
            tollCard,
            testedMeter,
            dateTime,
            sop,
            id,
            medicalCert,
            routePlan,
            handOver,
            LOBcheck,
            comments,
            inspectionSignature
        } = Request.body;
        const userId = Request.user.id;

        const user = await Register.findById(userId);
        const companyId = user.companyId;

        if (!user || !companyId) {
            return Response.status(404).json({
                message: "User or company not found"
            });
        }

        const newPreInspection = PreInspection({
            userId,
            companyId,
            EmployeeName: employeeName,
            InspectioDate: inspectionDate,
            InspectionStartTime: inspectionStart,
            LineManagerName: lineManager,
            WaterLevel: water,
            EnginOilLevel: engine,
            ClutchFluitLevel: clutch,
            SteeringFluitLevel: steering,
            WindScreenWasherLevel: windscreenWasher,
            NoDamageToVehicle: noDamage,
            WindScreenIsClean: cleanWindscreen,
            WipersInGoodCondition: wipers,
            LightAndReflectors: lightsReflectors,
            LightsAndReflectorsClean: cleanLightsRefectors,
            TyresPressuredNoDamage: tyrePressure,
            NoLeaks: noLeaks,
            Mirrors: mirrors,
            OrangeDiamond: orangeDimond,
            NumberPlates: numberPlates,
            Chevrons: chevron,
            BatteryCovers: batteryCover,
            WheelNutsMarkers: wheelNutMarkers,
            DustCovers: dustCovers,
            Valves: valves,
            FifthWheel: wheelFive,
            VisualLeaks: visualLeaks,
            SussiPypes: sussi,
            Placards: placards,
            AirLeaks: airLeaks,
            LicenseDisk: licenseDisk,
            SLP: slp,
            FirePermit: firePermit,
            HeadLights: headLights,
            ParkLights: parkLights,
            HazardLights: hazardsLights,
            TailLights: tailLights,
            NumberPlateLights: numberPlateLights,
            BrakeLights: brakeLights,
            WorkLights: workLights,
            ReverseLights: reverseLights,
            Brakes: brakes,
            SafetyShoes: safetyShoes,
            Reflective: reflective,
            Musk: musk,
            HardHat: hardHat, Gloves: gloves,
            Vest: vest,
            Shocks: shocks,
            Torch: torch,
            ValidFireEx: validExstinguisher,
            Spill: spill,
            FirstAid: firstAid,
            SelfStanding: selfStanding,
            EarthCable: earthCable,
            SeatBelts: seatBelts,
            Hooter: hooter,
            InhouseLights: inhouseLights,
            DangerousGoods: dangerousGoods,
            Tremcard: tremcard,
            WheelSteering: steeringwheel,
            LoadDocuments: loadedDocuments,
            ShipmentLog: shipmentLog,
            DeliverySequence: deliverySequence,
            JourneyPlan: journeyPlan,
            FAN: fan,
            BOL: bol,
            EnoughFuel: enoughFuel,
            TollCard: tollCard,
            TestMeter: testedMeter,
            DateAndTime: dateTime,
            SOP: sop,
            ID: id,
            MedicalCert: medicalCert,
            RoutePlan: routePlan,
            HandOver: handOver,
            LOBCheck: LOBcheck,
            Comments: comments,
            InspectionSignature: inspectionSignature
        })

        await newPreInspection.save();
        return Response.status(200).json({
            status: 'ok',
            message: 'Data Saved'
        });

    } catch (error) {
        console.log('failed to send data', error.message)
        return Response.status(500).json({ status: "error", data: 'Internal Server Error' });

    }
}

const getPreInspection = async (Request, Response) => {
    try {
        const userId = Request.user.id;
        if (!userId) {
            return Response.status(404).json({
                status: 'error', message: 'User ID required'
            });
        }

        const user = await Register.findById(userId);
        const companyId = user.companyId;
        if (!user || !companyId) {
            return Response.status(400).json({
                message: "User or company Not found"
            })
        }

        const PreTripInspection = await PreInspection.find({
            companyId: companyId
        })

        if (!PreTripInspection) {
            return Response.status(404).json({
                message: "No Inspections Logged"
            })
        }

        // debugging
        console.log("Pre Inspection", PreTripInspection);
        return Response.status(200).json({
            status: 'ok',
            message: PreTripInspection
        });

    } catch (error) {
        return Response.status(500).json({ status: "error", message: error.message });
    }
}

module.exports = { createPreInspection, getPreInspection }; 