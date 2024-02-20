"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class city_masters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      city_masters.belongsTo(models.state_masters, {
        foreignKey: "state_masters_id",
      });
      city_masters.belongsTo(models.country_masters, {
        foreignKey: "country_masters_id",
      });
    }
  }
  city_masters.init(
    {
      city_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "city_masters",
    }
  );
  return city_masters;
};
