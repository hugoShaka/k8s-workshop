const express = require('express');
const router = express.Router();
const contactsModel = require('../models').contacts;
const uuidv4 = require("uuid/v4");

/* POST Create new Contacts. */
router.post('/', (req, res) => {
    contactsModel
        .create({
            uuid: uuidv4(),
            email: req.body.email,
            message: req.body.message,
            isSent: false,
            sendAt: null
        })
        .then(contact => res.status(201).json(contact))
        .catch(error => res.status(400).json({error: error.message}));
});

/* GET Contact list. */
router.get('/list', function (req, res, next) {
    contactsModel
        .findAll()
        .then(contacts => res.status(200).json(contacts))
        .catch(error => res.status(400).json({error: error.message}));
});

module.exports = router;
