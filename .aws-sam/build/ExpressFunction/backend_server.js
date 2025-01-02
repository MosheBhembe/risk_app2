/*
    
    ***************************************************************************
    
                        RiskBT is a risk management reporting app 
                        for ensuring that all potential risks are 
                        reported and attended to.

    ***************************************************************************

*/

// imports of all the needed tool/technologies 
const Express = require('express');
const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');
const uploadImage = multer({ dest: 'uploads/' });
// const PORT = 5001;
const nodemailer = require('nodemailer');
const cors = require('cors');
app.use(cors({
    origin: '*',
    methods: 'POST, GET, PUT, PATCH, POST, DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization'
}));

const expressTimeout = require('connect-timeout'); 
app.use(expressTimeout("120s")); 
// const mgService = mailgun(
//     {
//         api_key: 'pubkey-49ea76b43d94e5a6c6618eb4a9b1399e',
//         dev_Secret: 'sandboxaaec73f85a994a82b92939b7d5b96613.mailgun.org'
//          oizqrjqjyclbdoyz'
//     }
// );
// Connection to database, JWT_SECRET. 
const databaseLink = 'mongodb+srv://moshebhembe96:riskadatabaseadmin@riskappdatabase.h1nlg5o.mongodb.net/?retryWrites=true&w=majority&appName=RiskappDatabase';
const JWT_SECRET = 'WE2N32hjkdllsaiendlsjs!@${}{[]shwomcJDNIOAOPWMNKSKFY2737UFLA8sswn2';
let companyEmail = 'mpanzanomhle@gmail.com';

// SMTP/Nodemailer Configuration 

const emailConfigurations = nodemailer.createTransport({
    host: 'smtp.gmail.com', //smtp.mailgun.org
    port: 465,
    secure: 'false',
    auth: {
        user: 'vsmlb96@gmail.com',
        pass: 'oizqrjqjyclbdoyz'
        // user: 'postmaster@sandboxaaec73f85a994a82b92939b7d5b96613.mailgun.org',
        // pass: '722b7909e072974a95bf40514e835348-0f1db83d-c219cac9'
    }
});

// Email Contructor
require('./Schemas/emails');
const Email = mongoose.model('emails');

// connects that express server to mongo Database
mongoose.connect(databaseLink).then(() => {
    console.log('Database Connected');
}).catch((e) => {
    console.error('connot connect to database', e)
});


// // connection to port 
// app.listen(PORT, () => {
//     console.log(`Server now listening on port ${PORT}`);
// });

// User Registration Code
require('./Schemas/registrationData');
const Register = mongoose.model('Registration Data');
app.post('/api/Register-user', timeout('120s'), async (Request, Response) => {
    const { name, surname, email, password, confirmPassword } = Request.body;
    const encrpytedPassword = await bcrypt.hash(password, 10);
    const encrpytedPasswordConfirmation = await bcrypt.hash(confirmPassword, 10);
    const RegisteredUser = await Register.findOne({ Email: email });

    if (RegisteredUser) {
        Response.send({ data: 'This email is already registered' });
    }
    try {
        await Register.create({
            Names: name,
            Surname: surname,
            Email: email,
            Password: encrpytedPassword,
            ConfirmPassword: encrpytedPasswordConfirmation
        })
        Response.send({ status: 'ok', data: 'User Created' });
    } catch (error) {
        Response.send({ status: 'Error', data: error })
    }
});

// User login api 
app.post('/api/login-user', setTimeout('120s'), async (Request, Response) => {
    try {
        const { email, password } = Request.body;
        const existingUser = await Register.findOne({ Email: email });

        if (!existingUser) {
            return Response.status(404).send({ data: 'User NOT FOUND' });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.Password);

        if (!isPasswordValid) {
            return Response.status(401).send({ error: 'Invalid Password' });
        }

        const token = jwt.sign({ email: existingUser.Email }, JWT_SECRET);
        return Response.status(201).send({ status: 'ok', data: token });
    } catch (error) {
        console.error(error);
        Response.status(500).send({ error: 'Internal server error' })
    }
});

// User information Api 
app.post('/api/user-data', setTimeout('120s'), async (Request, Response) => {
    const { token } = Request.body;
    try {

        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
        const userEmail = user.email;
        const userData = await Register.findOne({ Email: userEmail });

        if (!userData) {
            return Response.status(404).send({ status: 'error', data: 'User not found' });
        }

        return Response.status(200).send({ status: 'ok', data: userData });

    } catch (error) {
        console.error(error)
        return Response.status(500).send({ status: 'error', data: 'internal Server error' });
    }
});

// Forgot password API
app.post('/api/forgot-password', setTimeout("120s"), async (Request, Response) => {
    const { email } = Request.body;
    try {
        const regUser = await Register.findOne({ Email: email });

        if (!regUser) {
            return Response.status(404).send({ status: "error", data: "User not found" });
        }

        const token = jwt.sign({ email: regUser.Email }, JWT_SECRET, { expiresIn: "1h" });
        const linkReset = `https://riskbt.com/reset-password?token=${token}`// for now

        // Email format
        const emailLink = {
            from: companyEmail,
            to: email,
            subject: 'Reset Password',
            text: `You requested to reset your password. Please click the link that follows to change your RiskBT account password.\n ${linkReset}`
        }

        // Email Service. 
        emailConfigurations.sendMail(emailLink, (error, info) => {
            if (error) {
                Response.send({ status: "error", message: "Could not send email" })
            }
            Response.send({ status: "ok", message: "You link has been sent" })
        })

    } catch (error) {
        return Response.status(500).send({ status: 'error', data: `Server error ${error}` });
    }
});

// Reset password API 
app.post('/api/reset-password', setTimeout('120s'), async (Request, Response) => {
    const { token, newPassword, confirmNewPassowrd } = Request.body;
    try {
        const decodedJWT = jwt.verify(token, JWT_SECRET);
        const UserEmail = decodedJWT.email;

        const nRegUser = await Register.findOne({ Email: UserEmail });

        if (!nRegUser) {
            return Response.status(404).send({ status: 'error', data: 'User not found' })
        }

        if (newPassword !== confirmNewPassowrd) {
            return Response.status(400).send({ message: 'Password do not match' });
        }

        if (newPassword === nRegUser.Password) {
            return Response.status(400).send({ message: 'This password has already been used. Please use a different password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        nRegUser.Password = hashedPassword;
        await nRegUser.save();
        return Response.status(200).send({ status: 'ok', data: 'password updated' });
    } catch (error) {
        return Response.status(500).send({ status: 'error', data: 'Internal Server Error' });
    }
});

// Report Incident api
require('./Schemas/ReportData');
const Report = mongoose.model('ReportData');

/*
    This api gets the Incident report and sends it to the mongo database
    it also sends the data via email. 

    ***************************************************

    CODE FOR EMAIL AFTER DATA SEND.

    ***************************************************

*/
app.post('/api/report-incident-data',setTimeout("120s"), async (Request, Response) => {
    const { name, email, location, assets, dateTime } = Request.body;

    const emailInfo = `${name}, ${email}, ${location}, ${assets}, ${dateTime}`;
    const sendInfo = {
        to: companyEmail,
        from: email,
        subject: 'Incident Report',
        text: emailInfo,
    }

    emailConfigurations.sendMail(sendInfo, setTimeout('120s'),async (error, info) => {
        if (error) {
            Response.status({ status: "error", message: 'Your email could not be sent' })
        }
        Response.status({ status: 'ok', message: 'Email has been sent to management' });

        try {
            const email = new Email(sendInfo);
            await email.save();
            Response.status({ status: 'ok', message: 'Email Data Saved' });
        } catch (error) {
            Response.status({ status: 'Error', message: `Error saving email Data: ${error}` });
        }
    })

    try {
        await Report.create({
            name: name,
            email: email,
            location: location,
            assets: assets,
            dateTime: dateTime
        });
        Response.send({ status: 'ok', data: "Report Data Created" });
    } catch (error) {
        Response.status(500).send({ status: "error", data: error });
    }

});

/*
    This api gets the Fuel Report data and sends it to the mongo database
    it also sends the data via email. 

    ***************************************************

    CODE FOR EMAIL AFTER DATA SEND.

    ***************************************************

*/
require('./Schemas/ConsumptionData');
const FuelData = mongoose.model('consumptionData');

/* 
    This section saves the image taken from the fuel report
    and saves it on te database

    **************************************************

    CODE TO SEND THE EMAIL AFTER DATA SAVE

    **************************************************
*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.post('/api/fuel-consumption', upload.single('image'), async (Request, Response) => {
    const { name, regNumber, amount, cost, date } = Request.body;
    const image = req.file ? req.file.path : null;

    if (!image) {
        return Response.status(400).send({ status: 'error', data: 'Image upload failed' });
    }
    const emailReportData = {
        from: userEmail,
        to: companyEmail,
        subject: `Fuel Consumption report from ${name}: Registration #: ${regNumber}`,
        text: `Name: ${name}, Registration: ${regNumber}, Amount: ${amount}, Cost: ${cost}, Date: ${date}, Image: ${image}`,
        attachments: [
            {
                filename: 'image.jpg',
                path: './uploads/image',
                cid: 'unique@nodemailer.com'
            }
        ]

    };

    /*
        ************************************************

        CODE THAT SEND THE DATA VIA EMAIL 

        ************************************************
    */
    emailConfigurations.sendMail(emailReportData, async (error, info) => {
        if (error) {
            console.log('error sending email', error);
            Response.send({ status: "error", message: "Email was not sent" })
        }
        console.log('email sent', info.response);
        Response.send({ status: 'ok', message: "email has been sent" });

        try {
            const email = new Email(emailReportData);
            await email.save()
            console.log('Email data saved');
        } catch (error) {
            console.log('error saving email', error);
        }
    })

    try {
        await FuelData.create({
            Name: name,
            Registration: regNumber,
            Amount: amount,
            Cost: cost,
            Image: image,
            DateTime: date
        });
        res.send({ status: 'ok', data: 'Fuel data Stored and email sent' });
    } catch (error) {
        res.status(500).send({ status: 'error', data: error.message });
    }

});

/*
    This api gets the Near hit incident report and sends it to the mongo database
    it also sends the data via email. 

    ***************************************************

    CODE FOR EMAIL AFTER DATA SEND.

    ***************************************************

*/

require('./Schemas/NearHitData');
const NearHit = mongoose.model('HitData');
app.post('/api/near-hit', setTimeout('120s'),async (Request, Response) => {
    const { name, location, description, asset, date } = Request.body;
    /*
        ************************************************

        CODE THAT SEND THE DATA VIA EMAIL 

        ************************************************
    */

    // Email Format
    const emailNearHitData = {
        from: userEmail,
        to: companyEmail,
        subject: `Near Hit Report from ${userEmail} date: ${Date.now()}`,
        text: `Name: ${name} \n Location: ${location} \n Assets: ${asset} \n Description: ${description} \n Date: ${date}`
    }

    // email sending service. 
    emailConfigurations.sendMail(emailNearHitData, async (error, info) => {
        if (error) {
            console.log('error sending email', error);
            Response.status({ status: 'error', message: 'Email was not sent' });
        }
        console.log('Email Sent', info.response);
        Response.status({ status: 'ok', message: 'Your email has been sent to management' });
        try {
            const email = new Email(emailNearHitData);
            await email.save()
            console.log('Email data saved');
        } catch (error) {
            console.log('error saving email', error);
        }
    })
    try {
        await NearHit.create({
            Name: name,
            Location: location,
            Equipment: asset,
            Description: description,
            Date: date
        })
        Response.send({ status: 'ok', data: 'Near Hit data created' })
    } catch (error) {
        Response.send({ status: 'error', data: error });
    }
});

/*
    This api gets the Near hit incident report and sends it to the mongo database
    it also sends the data via email. 

    ***************************************************

    CODE FOR EMAIL AFTER DATA SEND.

    ***************************************************

*/
// gets the mongoose Schema from the schemas folder 
require('./Schemas/TyreChangeData');
const TyreChange = mongoose.model('Tyre change report');
app.post('/api/tyre-change-data', setTimeout('120s'), async (Request, Response) => {
    const { email, registrationNumber, burstData, dateAndTime } = Request.body;

    const userMailAddress = Register.findOne({ Email: email });
    /*
        ************************************************

        CODE THAT SEND THE DATA VIA EMAIL 

        ************************************************
    */

    //email format
    const emailTyreChangeData = {
        from: userMailAddress,
        to: companyEmail,
        subject: `tyre change report from ${userEmail} date: ${Date.now()}`,
        text: `Registration Number: ${registrationNumber}\n Burst Tyre: ${burstData}\n Date of Incident: ${dateAndTime}`

    }

    // email sending service
    emailConfigurations.sendMail(emailTyreChangeData, async (error, info) => {
        if (error) {
            console.log('error sending email', error);
            Response.status({ status: "error", message: 'error sending message' });
        }
        console.log('Email sent', info.response);
        Response.status({ status: 'ok', message: 'email has been send successfully' })
    })
    // save the data to database
    try {
        await TyreChange.create({
            Registration: registrationNumber,
            Burst: burstData,
            TimeandDate: dateAndTime
        })
        Response.send({ status: 'ok', data: 'Tyre change data created' });
    } catch (error) {
        Response.send({ status: 'error', data: error });
    }
});

app.get('/api/sent-emails', setTimeout('120s'), async (req, res) => {

    try {
        const emails = await Email.find();
        res.status(200).json({ status: 'ok', data: emails });
    } catch (error) {
        console.log('Error fetching emails: ', error);
        res.status(500).json({ status: 'error', message: `Failed to fetch emails` });
    }
});

module.exports = app; 