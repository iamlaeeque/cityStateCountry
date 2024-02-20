"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class state_masters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with country_masters
      state_masters.belongsTo(models.country_masters, {
        foreignKey: "country_masters_id",
      });
      state_masters.hasMany(models.city_masters, {
        foreignKey: "state_masters_id",
      });
    }
  }
  state_masters.init(
    {
      state_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_masters_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "state_masters",
    }
  );
  return state_masters;
};
