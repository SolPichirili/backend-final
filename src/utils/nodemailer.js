const nodemailer = require('nodemailer');
const logger = require('./winston');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'solchi.test@gmail.com',
        pass: process.env.GMAIL_PASSWORD
    }
});

const sendMail = async (message) => {
    try {
        const mailOptions = {
            from: 'Servidor Node.js',
            to: 'solchi.test@gmail.com',
            subject: 'Nuevo registro',
            message
        }

        return await transporter.sendMail(mailOptions);

    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    sendMail
}