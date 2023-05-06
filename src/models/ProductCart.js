import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";
import { Product } from "./Product.js";
import { Cart } from "./Cart.js";

export const ProductCart = sequelize.define(
    "product_cart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      cartId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'carts',
          key: 'id',
        },
      },
      productQuantity: {
        type: DataTypes.INTEGER,
      }
    },
    {
      timestamps: false,
    }
  );

Product.belongsToMany(Cart, { through: ProductCart });
Cart.belongsToMany(Product, { through: ProductCart });