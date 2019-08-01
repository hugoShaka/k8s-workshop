const express = require('express');
const router = express.Router();
const mailhogHost = require('../package.json').mailhogHost;
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    sendmail: true,
    path: "/usr/sbin/sendmail",
    args: ["-S", mailhogHost]
});

function sendEmail(contact) {
    const cronDestEmail = require('../package.json').cronDestEmail;

    const mailOptions = {
        from: contact.email,
        to: cronDestEmail,
        subject: 'New contact request',
        text: contact.message,
        html: '<p><b>' + contact.message + '</b></p>'
    };

    transport
        .sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(JSON.stringify({error: error.message}));
            } else {
                console.log('Message sent: %s', response.messageId);
                console.log(JSON.stringify({uuid: contact.uuid, sendAt: new Date()}));
            }
        })
    ;
}

/* POST [CRON] Sends contact client requests to admin. */
router.post('/email-send', function (req, res, next) {
    const cronToken = require('../package.json').cronToken;
    const authToken = req.body.token;

    if (cronToken !== authToken) {
        res.status(403).json({error: "bad credentials"});
    } else {
        const contactsModel = require('../models').contacts;
        contactsModel.findAll({where: {isSent: false}})
            .then(contacts => {
                contacts.forEach(contact => {
                    // Send Email
                    sendEmail(contact);

                    // Update Contact request
                    contact
                        .update({
                            isSent: true,
                            sendAt: new Date()
                        })
                        .catch(error => res.status(400).json({error: error.message}));
                });
                res.status(200).json({success: true})
            })
            .catch(error => res.status(400).json({error: error.message}));
    }
});

module.exports = router;
