'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notNull: true,
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      login: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      avatar_url: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Date.now(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Date.now(),
        type: Sequelize.DATE,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('Users');
  },
};
