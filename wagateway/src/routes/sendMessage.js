const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

module.exports = function(sock) {
    router.post('/send-message', upload.single('image'), async (req, res) => {
        const { phoneNumber, message, isGroup } = req.body;
        let imagePath;

        try {
            if (req.file) {
                imagePath = req.file.path;
            } else if (req.body.image) {
                imagePath = req.body.image;
            }

            let recipientJid = isGroup ? phoneNumber + '@g.us' : phoneNumber + '@s.whatsapp.net';

            let sentMsg;
            if (imagePath && typeof imagePath === 'string') {
                sentMsg = await sock.sendMessage(recipientJid, {
                    image: { url: imagePath },
                    caption: message
                });
            } else if (message) {
                sentMsg = await sock.sendMessage(recipientJid, { text: message });
            } else {
                throw new Error('No valid message or image data provided');
            }

            res.status(200).json({ status: 'success', messageId: sentMsg.key.id });
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Failed to send message', error: error.message });
        }
    });

    return router;
};
