'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoiceItems.init({
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    invoiceId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'InvoiceItems',
  });
  return InvoiceItems;
};