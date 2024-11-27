import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
const config = require('../config/config.json');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db: any = {};

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js') &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach(async file => {
    // Changed to use dynamic import
    const module = await import(path.join(__dirname, file));
    const model = module.default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;