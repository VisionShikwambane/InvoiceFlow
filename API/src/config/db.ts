import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('invoicydb', 'root', 'Tintswalo@19', {
  host: 'localhost',
  dialect: 'mysql',
});

