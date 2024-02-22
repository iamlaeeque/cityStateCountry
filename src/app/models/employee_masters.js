"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employee_masters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employee_masters.hasMany(models.employee_attachments, {
        foreignKey: "employee_masters_id",
      });
    }
  }
  employee_masters.init(
    {
      employeeName: DataTypes.STRING,
      mobileNumber: DataTypes.STRING,
      joiningDate: DataTypes.DATE,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "employee_masters",
    }
  );
  return employee_masters;
};
