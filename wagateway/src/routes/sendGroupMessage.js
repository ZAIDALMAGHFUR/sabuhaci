const express = require('express');
const router = express.Router();

module.exports = function(sock) {
    router.post('/send-group-message', async (req, res) => {
        const { groupId, message } = req.body;

        try {
            const sentMsg = await sock.sendMessage(groupId + '@g.us', { text: message });
            res.status(200).json({ status: 'success', messageId: sentMsg.key.id });
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Failed to send message', error: error.message });
        }
    });

    return router;
};
