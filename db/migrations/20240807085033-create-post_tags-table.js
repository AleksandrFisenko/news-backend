'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('PostTags', {
      post_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tag_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('PostTags');
  },
};
