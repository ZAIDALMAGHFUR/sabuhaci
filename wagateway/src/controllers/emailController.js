const { sendEmail } = require('../services/emailService');

exports.sendEmail = async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        const info = await sendEmail(to, subject, text, html);
        res.status(200).json({ status: 'success', message: 'Email sent successfully', info: info });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to send email', error: error.message });
    }
};
