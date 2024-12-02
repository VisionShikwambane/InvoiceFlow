import { Model, DataTypes, Sequelize } from 'sequelize';

interface InvoiceAttributes {
    invoiceNo: string;
    companyLogo?: Buffer;
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    companyAddress: string;
    signatureImage?: Buffer;
    signatureDate?: Date;
    issueDate: Date;
    dueDate: Date;
    notes?: string;
    termsAndConditions?: string;
    userId: number;
    clientId: number;
    templateId?: number;
    subtotal: number;
    taxRate: number;
    currency: string;
    status: string;
    tax: number;
    total: number;
}

export default (sequelize: Sequelize) => {
    class Invoice extends Model<InvoiceAttributes> implements InvoiceAttributes {
        public invoiceNo!: string;
        public companyLogo?: Buffer;
        public companyName!: string;
        public companyEmail!: string;
        public companyPhone!: string;
        public companyAddress!: string;
        public signatureImage?: Buffer;
        public signatureDate?: Date;
        public issueDate!: Date;
        public dueDate!: Date;
        public notes?: string;
        public termsAndConditions?: string;
        public userId!: number;
        public clientId!: number;
        public templateId?: number;
        public subtotal!: number;
        public taxRate!: number;
        public currency!: string;
        public status!: string;
        public tax!: number;
        public total!: number;

        static associate(models: any) {
            // Association with Client
            Invoice.belongsTo(models.Client, { 
                foreignKey: 'clientId',
                as: 'client'
            });
            
            // Association with InvoiceItem
            Invoice.hasMany(models.InvoiceItem, {
                foreignKey: 'invoiceId',
                as: 'invoiceItems'
            });
        }
    }

    Invoice.init({
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
        total: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'Invoice',
        tableName: 'invoices'
    });

    return Invoice;
};
