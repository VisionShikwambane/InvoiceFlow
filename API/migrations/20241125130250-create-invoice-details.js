'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InvoiceDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      InvoiceNo: {
        allowNull: false,
        type: Sequelize.STRING
      },
  
      Logo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CompanyName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CompanyEmail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CompanyPhone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CompanyAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      IssueDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      DueDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Notes: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      TermsAndConditions: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ClientId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      TemplateId: {
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
    await queryInterface.dropTable('InvoiceDetails');
  }
};