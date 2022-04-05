const nodemailer = require('nodemailer');
const options = require('../config');
const logger = require('./winston');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: options.nodemailerMail,
        pass: options.nodemailerPassword
    }
});

const sendMail = async (message) => {
    try {
        const mailOptions = {
            from: 'Servidor Node.js',
            to: options.nodemailerMail,
            subject: 'Nuevo',
            message
        }

        return await transporter.sendMail(mailOptions);

    } catch (error) {
        logger.error(error);
    }
}

module.exports = {
    sendMail
};