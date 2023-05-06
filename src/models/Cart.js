import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { Product } from "./Product.js";

export const Cart = sequelize.define(
  "carts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  
    itemsQuantity: {
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
