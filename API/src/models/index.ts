import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db: { [key: string]: any } = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.slice(-3) === '.ts')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
