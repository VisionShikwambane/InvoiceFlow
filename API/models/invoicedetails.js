'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetails extends Model {
    static associate(models) {
      // Define association with User model
      // InvoiceDetails.belongsTo(models.User, {
      //   foreignKey: 'userId',
      //   as: 'user',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });

      // Define association with UserClients model
      // InvoiceDetails.belongsTo(models.UserClients, {
      //   foreignKey: 'clientId',
      //   as: 'client',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // });

      // Define association with Template model (if it exists)
      // InvoiceDetails.belongsTo(models.Template, {
      //   foreignKey: 'templateId',
      //   as: 'template',
      //   onDelete: 'SET NULL',
      //   onUpdate: 'CASCADE',
      // });
    }
  }

  InvoiceDetails.init(
    {
      invoiceNo: DataTypes.STRING,
      logo: DataTypes.STRING,
      companyName: DataTypes.STRING,
      companyEmail: DataTypes.STRING,
      companyPhone: DataTypes.STRING,
      companyAddress: DataTypes.STRING,
      issueDate: DataTypes.DATE,
      dueDate: DataTypes.DATE,
      notes: DataTypes.TEXT,
      termsAndConditions: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      clientId: DataTypes.INTEGER,
      templateId: DataTypes.INTEGER,
      subtotal: DataTypes.FLOAT,
      taxRate: DataTypes.FLOAT,
      currency: DataTypes.STRING,
      status: DataTypes.STRING,
      tax: DataTypes.FLOAT,
      total: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'InvoiceDetails',
    }
  );
  return InvoiceDetails;
};
