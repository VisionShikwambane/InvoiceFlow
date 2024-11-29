import { Model, DataTypes } from 'sequelize';

module.exports = (sequelize: any) => {
  class InvoiceItems extends Model {
  
    static associate(models: any) {
      // define association here
    }
  }
  InvoiceItems.init({
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    invoiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoiceItems',
  });
  return InvoiceItems;
};