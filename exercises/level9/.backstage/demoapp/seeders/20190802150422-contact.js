'use strict';

const uuidv4 = require("uuid/v4");

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('contacts', [
            {
                uuid: uuidv4(),
                email: 'user1@example.com',
                message: 'hello world !',
                isSent: false,
                sendAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                uuid: uuidv4(),
                email: 'user2@example.com',
                message: 'Bonjour le monde !',
                isSent: false,
                sendAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                uuid: uuidv4(),
                email: 'user3@example.com',
                message: 'Hola Mundo !',
                isSent: false,
                sendAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                uuid: uuidv4(),
                email: 'user4@example.com',
                message: 'Γειά σου Κόσμε !',
                isSent: false,
                sendAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('contacts', null, {});
    }
};
