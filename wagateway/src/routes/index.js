const express = require('express');
const sendMessageRoute = require('./sendMessage');
const getGroupsRoute = require('./getGroups');
const sendGroupMessageRoute = require('./sendGroupMessage');
const sendEmailRoute = require('./sendEmail');

module.exports = function(sock) {
    const router = express.Router();

    // Use the individual routes
    router.use(sendMessageRoute(sock));
    router.use(getGroupsRoute(sock));
    router.use(sendGroupMessageRoute(sock));
    router.use(sendEmailRoute(sock));

    return router;
};
