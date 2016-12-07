var nodemailer = require('nodemailer');

// let smtpConfig;
// if (process.env.NODE_ENV !== 'production') {
    const smtpConfig = {
        service: 'Mailgun',    
        auth: {
            user: 'postmaster@sandbox28e182c251764d5b96a71536174ca420.mailgun.org',
            pass: '1bef070f9f714e347f36c45c0d5437e0',
            apiKey: 'key-73f4d8a1f95e332bd967b059bbdd4e47',
            domain: 'sandbox28e182c251764d5b96a71536174ca420.mailgun.org'
        }
    };
// } else {
    // const smtpConfig = {
    //     service: 'Mailgun',    
    //     auth: {
    //         user: 'postmaster@tracky.robertschneiderman.com',
    //         pass: '54fadbb75abe5f34ecb916bfbe16af23',
    //         apiKey: 'key-d90c83dafb0d89bacece2c6b315250cf',
    //         domain: 'https://api.mailgun.net/v3/tracky.robertschneiderman.com'
    //     }
    // };    
// }

exports.transporter = nodemailer.createTransport(smtpConfig);