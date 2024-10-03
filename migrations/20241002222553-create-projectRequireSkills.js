'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projectRequireSkills', {
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projects',  // Name of the Project table
          key: 'id'          // Reference key in the Project table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      skillId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'skills',    // Name of the Skill table
          key: 'id'           // Reference key in the Skill table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      // primaryKey: true,  // Adding a composite primary key (not sure)
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projectRequireSkills');
  }
};
