import { Model, DataTypes } from 'sequelize';

module.exports = (sequelize: any) => {
    class Invoices extends Model {
        static associate(models: any) {
            this.belongsTo(models.Client, { foreignKey: 'clientId' });
        }
    }

    Invoices.init(
        {
            invoiceNo: DataTypes.STRING,
            companyLogo: DataTypes.BLOB('medium'),
            companyName: DataTypes.STRING,
            companyEmail: DataTypes.STRING,
            companyPhone: DataTypes.STRING,
            companyAddress: DataTypes.STRING,
            signatureImage: DataTypes.BLOB('medium'),
            signatureDate: DataTypes.DATE,
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
            modelName: 'Invoices',
            tableName: 'invoices',
        }
    );

    return Invoices;
};
