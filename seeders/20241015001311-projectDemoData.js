'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Projects', [
      {
        title: 'Website Development',
        description: 'make a website',
        budget: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Design',
        description: 'make a mobile app',
        budget: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Marketing Strategy',
        description: 'make marketing stratigies',
        budget: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Marketing Strategy',
        description: 'make  stratigies',
        budget: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Marketing Strategy',
        description: 'make meeting stratigies',
        budget: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Website Development',
        description: 'make a website',
        budget: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Design',
        description: 'make a mobile app',
        budget: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Website Development',
        description: 'make a website',
        budget: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Design',
        description: 'make a mobile app',
        budget: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Website Development',
        description: 'make a website',
        budget: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Design',
        description: 'make a mobile app',
        budget: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Website Development',
        description: 'make a website',
        budget: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Design',
        description: 'make a mobile app',
        budget: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Website Development',
        description: 'make a website',
        budget: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Design',
        description: 'make a mobile app',
        budget: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Marketing Strategy',
        description: 'make marketing stratigies',
        budget: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Marketing Strategy',
        description: 'make  stratigies',
        budget: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Marketing Strategy',
        description: 'make meeting stratigies',
        budget: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Website Development',
        description: 'make a website',
        budget: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Design',
        description: 'make a mobile app',
        budget: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Website Development',
        description: 'make a website',
        budget: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Design',
        description: 'make a mobile app',
        budget: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Website Development',
        description: 'make a website',
        budget: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Design',
        description: 'make a mobile app',
        budget: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Website Development',
        description: 'make a website',
        budget: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mobile App Design',
        description: 'make a mobile app',
        budget: 3000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Projects', null, {});
  }
};
  