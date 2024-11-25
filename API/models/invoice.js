'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init({
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
    modelName: 'Invoice',
  });
  return Invoice;
};