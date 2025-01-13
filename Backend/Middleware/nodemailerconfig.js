const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_AUTH,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

module.exports = transporter

// const emailConfigurations = () => {
//     const emailsendConfigurations = nodemailer.createTransport({
//         host: 'smtp.gmail.com', //smtp.mailgun.org
//         port: 465,
//         secure: 'false',
//         auth: {
//             user: 'vsmlb96@gmail.com',
//             pass: 'oizqrjqjyclbdoyz'
//             // user: 'postmaster@sandboxaaec73f85a994a82b92939b7d5b96613.mailgun.org',
//             // pass: '722b7909e072974a95bf40514e835348-0f1db83d-c219cac9'
//         }
//     });

//     return emailsendConfigurations;
// }

// module.exports = emailConfigurations