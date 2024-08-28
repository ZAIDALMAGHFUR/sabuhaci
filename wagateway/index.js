const express = require('express');
const bodyParser = require('body-parser');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');

const app = express();
app.use(bodyParser.json());

const startSock = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_multi');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                startSock();
            } else {
                console.log("Connection closed. You are logged out.");
            }
        }
        console.log('Connection update:', update);
    });

    // Use the consolidated routes
    app.use('/', require('./src/routes')(sock));
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`WhatsApp Gateway is running on port ${PORT}`);
    startSock();
});
