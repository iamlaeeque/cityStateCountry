"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employees.init(
    {
      employeeName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "Employee name cannot be null" } },
      },
      mobileNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Number is required",
          },
          isInt: {
            msg: "Number must be an integer",
          },
        },
      },
      joiningData: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: "employees",
    }
  );
  return Employees;
};
