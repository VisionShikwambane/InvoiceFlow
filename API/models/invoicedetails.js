'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InvoiceDetails.belongsTo(models.User, {
        foreignKey: 'UserId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      // Define association with UserClients model
      InvoiceDetails.belongsTo(models.UserClients, {
        foreignKey: 'ClientID',
        as: 'client',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      InvoiceDetails.belongsTo(models.InvoiceItems, {
        foreignKey: 'ItemID',
        as: 'item',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      // // Define association with Template model (if exists)
      // InvoiceDetails.belongsTo(models.Template, {
      //   foreignKey: 'TemplateId',
      //   as: 'template',
      //   onDelete: 'SET NULL',
      //   onUpdate: 'CASCADE',
      // });


    }
  }
  InvoiceDetails.init({
    InvoiceNo: DataTypes.STRING,
    IssueDate: DataTypes.DATE,
    DueDate: DataTypes.DATE,
    Notes: DataTypes.TEXT,
    TermsAndConditions: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    ClientID: DataTypes.INTEGER,
    ItemID: DataTypes.INTEGER,
    TemplateId: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT,
    taxRate: DataTypes.FLOAT,
    currency: DataTypes.STRING,
    tax: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'InvoiceDetails',
  });
  return InvoiceDetails;
};