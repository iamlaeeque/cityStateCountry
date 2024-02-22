"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employee_attachments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      employee_attachments.belongsTo(models.employee_masters, {
        foreignKey: "employee_masters_id",
      });
    }
  }
  employee_attachments.init(
    {
      fileName: DataTypes.STRING,
      filePath: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "employee_attachments",
    }
  );
  return employee_attachments;
};
