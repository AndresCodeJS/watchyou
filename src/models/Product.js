import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Product = sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      images: {
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: false,
    }
  );

