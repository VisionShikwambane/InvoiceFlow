import { Model, DataTypes } from 'sequelize';

module.exports = (sequelize: any) => {
    class Client extends Model {
        static associate(models: any) {
            this.hasMany(models.Invoices, { foreignKey: 'clientId' });
        }
    }

    Client.init(
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Client',
            tableName: 'clients',
        }
    );

    return Client;
};
