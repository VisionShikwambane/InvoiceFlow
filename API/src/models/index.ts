import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
const config = require('../config/config.json');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db: any = {};

console.log('Initializing Sequelize...');
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env]
);

// First, load all models
console.log('Reading model files from directory:', __dirname);
const modelFiles = fs.readdirSync(__dirname).filter(file => {
  const keepFile = file.indexOf('.') !== 0 &&
    file !== basename &&
    file.endsWith('.ts') &&
    !file.includes('.test.') &&
    !file.includes('.d.ts');
  if (keepFile) {
    console.log('Including model file:', file);
  }
  return keepFile;
});

console.log('Loading models...');
for (const file of modelFiles) {
  try {
    const modelPath = path.join(__dirname, file);
    console.log(`Loading model from path: ${modelPath}`);
    const model = require(modelPath.replace('.ts', '')).default(sequelize, DataTypes);
    if (model?.name) {
      console.log(`Successfully loaded model: ${model.name}`);
      db[model.name] = model;
    } else {
      console.log(`Warning: Model in ${file} has no name property:`, model);
    }
  } catch (error) {
    console.error(`Error loading model ${file}:`, error);
  }
}

console.log('Available models:', Object.keys(db));

// Then, run all associations after all models are loaded
console.log('Setting up model associations...');
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    try {
      console.log(`Setting up associations for model: ${modelName}`);
      db[modelName].associate(db);
      console.log(`Successfully associated model: ${modelName}`);
    } catch (error) {
      console.error(`Error associating model ${modelName}:`, error);
    }
  } else {
    console.log(`No associations defined for model: ${modelName}`);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;