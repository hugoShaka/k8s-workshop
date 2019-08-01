'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('contacts', {
            uuid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
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
                type: Sequelize.BOOLEAN,
                defaultValue: false
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('contacts');
    }
};
