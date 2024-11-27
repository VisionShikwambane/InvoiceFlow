import { Model, DataTypes } from 'sequelize';

export default (sequelize: any) => {
  class User extends Model {
  
  }

  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      signature: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
