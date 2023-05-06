import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "postgres", // db name,
  "postgres", // username
  "password", // password
  {
    host: "localhost",
    dialect: "postgres",
  }
);
