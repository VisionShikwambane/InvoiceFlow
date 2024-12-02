import { Model, DataTypes, Sequelize } from 'sequelize';

interface ClientAttributes {
    name: string;
    email: string;
    phone: string;
    address: string;
    userId?: number;
}

export default (sequelize: Sequelize) => {
    class Client extends Model<ClientAttributes> implements ClientAttributes {
        public name!: string;
        public email!: string;
        public phone!: string;
        public address!: string;
        public userId?: number;

        static associate(models: any) {
            Client.hasMany(models.Invoice, { 
                foreignKey: 'clientId',
                as: 'invoices'
            });
        }
    }

    Client.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Client',
        tableName: 'clients'
    });

    return Client;
};
