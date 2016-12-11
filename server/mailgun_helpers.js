var config = require('./config');
var nodemailer = require('nodemailer');

let smtpConfig;


if (process.env.NODE_ENV !== 'production') {
    smtpConfig = {
            service: 'Mailgun',    
            auth: {
                user: `${config.mailgunUser}`,
                pass: `${config.mailgunPass}`,
                apiKey: `${config.mailgunAPI}`,
                domain: `${config.mailgunDomain}`
            }
    };   
} else {
    smtpConfig = {
            service: 'Mailgun',    
            auth: {
                user: `${process.env.MAILGUN_API_USER}`,
                pass: `${process.env.MAILGUN_API_PASS}`,
                apiKey: `${process.env.MAILGUN_API_KEY}`,
                domain: `${process.env.MAILGUN_API_DOMAIN}`
            }
    };    
}


exports.transporter = nodemailer.createTransport(smtpConfig);