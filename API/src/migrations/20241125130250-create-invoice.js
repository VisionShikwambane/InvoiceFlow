'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoice', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoiceNo: {
        allowNull: false,
        type: Sequelize.STRING
      },
  
      logo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      companyName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      companyEmail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      companyPhone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      companyAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      issueDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      notes: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      termsAndConditions: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      clientId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      templateId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      subtotal: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      taxRate: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tax: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      total: {
        allowNull: false,
        type: Sequelize.FLOAT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoice');
  }
};