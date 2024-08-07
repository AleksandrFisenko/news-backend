'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Post_Tags', {
      post_id: {
        type: Sequelize.INTEGER,
      },
      tag_id: {
        type: Sequelize.INTEGER,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('Post_Tags');
  },
};
