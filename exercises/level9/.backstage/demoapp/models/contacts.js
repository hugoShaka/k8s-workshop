'use strict';

module.exports = (queryInterface, Sequelize) => {
    const Contact = queryInterface.define('contacts', {
        uuid: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING
        },
        message: {
            allowNull: false,
            type: Sequelize.TEXT
        },
        isSent: {
            allowNull: false,
            type: Sequelize.BOOLEAN
        },
        sendAt: {
            allowNull: true,
            type: Sequelize.DATE
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }, {});

    Contact.associate = function (models) {
        // associations can be defined here
    };

    return Contact;
};
