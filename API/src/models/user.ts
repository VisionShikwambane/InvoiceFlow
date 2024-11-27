'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    static associate(models: User) {
    
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};