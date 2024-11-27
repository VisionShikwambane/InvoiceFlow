import { Model, DataTypes } from 'sequelize';


module.exports = (sequelize: any) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  Client.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'clients',
  });
  return Client;
};