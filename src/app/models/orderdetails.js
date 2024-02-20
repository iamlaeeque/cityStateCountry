// models/OrderDetails.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    static associate(models) {
      OrderDetails.belongsTo(models.orders, { foreignKey: "ordersId" });
    }
  }
  OrderDetails.init(
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product Name is required",
          },
          notEmpty: {
            msg: "Product Name cannot be empty",
          },
        },
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Quantity is required",
          },
          isInt: {
            msg: "Quantity must be an integer",
          },
          min: {
            args: [1],
            msg: "Quantity must be at least 1",
          },
        },
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Rate is required",
          },
          isFloat: {
            msg: "Rate must be a floating-point number",
          },
          min: {
            args: [0],
            msg: "Rate must be at least 0",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "orderDetails",
    }
  );
  return OrderDetails;
};
