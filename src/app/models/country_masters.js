"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class country_masters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with state_masters
      country_masters.hasMany(models.state_masters, {
        foreignKey: "country_masters_id",
      });
      country_masters.hasMany(models.city_masters, {
        foreignKey: "country_masters_id",
      });
    }
  }
  country_masters.init(
    {
      country_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "country_masters",
    }
  );
  return country_masters;
};
