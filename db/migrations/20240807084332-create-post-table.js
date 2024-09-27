'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Post', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      image_url: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        defaultValue: Date.now(),
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        defaultValue: Date.now(),
        type: Sequelize.DATE,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('Post');
  },
};
