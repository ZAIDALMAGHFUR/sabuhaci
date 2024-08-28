const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

module.exports = function(sock) {
    router.post('/send-email', emailController.sendEmail);
    return router;
};
