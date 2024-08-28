require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Sender address
            to: to,                       // List of receivers
            subject: subject,             // Subject line
            text: text,                   // Plain text body
            html: html                    // HTML body
        });
        console.log('Email sent: %s', info.messageId);
        return info;  // Return the email info for further processing
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;  // Throw error to be caught in the controller
    }
};

module.exports = { sendEmail };
