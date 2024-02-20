// models/Orders.js
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.hasMany(models.orderDetails, { foreignKey: "ordersId" });
    }
  }
  Orders.init(
    {
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[a-zA-Z\s]+$/i,
            msg: "Customer Name should only contain alphabets and spaces",
          },
        },
      },
      orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          is: {
            args: /^O\d+$/i,
            msg: "Order Number must start with O and after that only digits are allowed.",
          },
        },
      },
      orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isNotFutureDate(value) {
            if (new Date(value) > new Date()) {
              throw new Error("Order Date cannot be in the future");
            }
          },
        },
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "orders",
    }
  );
  return Orders;
};
