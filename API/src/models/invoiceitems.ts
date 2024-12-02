import { Model, DataTypes, Sequelize } from 'sequelize';

interface InvoiceItemAttributes {
    description: string;
    price: number;
    quantity: number;
    invoiceId: number;
}

export default (sequelize: Sequelize) => {
  class InvoiceItem extends Model<InvoiceItemAttributes> implements InvoiceItemAttributes {
    public description!: string;
    public price!: number;
    public quantity!: number;
    public invoiceId!: number;

    static associate(models: any) {
      // Association with Invoice
      InvoiceItem.belongsTo(models.Invoice, {
        foreignKey: 'invoiceId',
        as: 'invoice'
      });
    }
  }

  InvoiceItem.init({
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    invoiceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoiceItem',
    tableName: 'invoiceitems'
  });

  return InvoiceItem;
};