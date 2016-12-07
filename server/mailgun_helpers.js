var nodemailer = require('nodemailer');

const smtpConfig = {
    service: 'Mailgun',    
    auth: {
        user: 'postmaster@sandbox28e182c251764d5b96a71536174ca420.mailgun.org',
        pass: '1bef070f9f714e347f36c45c0d5437e0',
        apiKey: 'key-73f4d8a1f95e332bd967b059bbdd4e47',
        domain: 'sandbox28e182c251764d5b96a71536174ca420.mailgun.org'
    }
};
exports.transporter = nodemailer.createTransport(smtpConfig);