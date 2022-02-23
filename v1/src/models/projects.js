const logger = require("../scripts/logger/Projects")
const User = require("./user");

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {



    }
  };
  Projects.init({
    name: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
    },

  }, {
    sequelize,
    modelName: 'Projects',
    hooks: {
      afterCreate: function (doc) {
        logger.log({
          level: "info",
          message: doc
        })
      }
    },

  });
  Projects.associate = function(models) {
    // associations can be defined here
    Projects.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    })
  };

  return Projects;
};