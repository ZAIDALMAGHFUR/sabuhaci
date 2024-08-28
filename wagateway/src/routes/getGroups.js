const express = require('express');
const router = express.Router();

module.exports = function(sock) {
    router.get('/get-groups', async (req, res) => {
        try {
            const groups = await sock.groupFetchAllParticipating();
            const groupList = Object.keys(groups).map(groupId => ({
                id: groupId,
                name: groups[groupId].subject
            }));

            res.status(200).json({ status: 'success', groups: groupList });
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Failed to fetch groups', error: error.message });
        }
    });

    return router;
};
