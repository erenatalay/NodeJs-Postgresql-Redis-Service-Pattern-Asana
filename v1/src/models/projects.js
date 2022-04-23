const logger = require("../scripts/logger/Projects")

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
    static associate({ User,Section }) {

      this.belongsTo(User, { foreignKey: 'user_id', onDelete: "CASCADE", onUpdate: "CASCADE" })
      this.hasMany(Section, { foreignKey: 'section_id',onDelete : "CASCADE",onUpdate : "CASCADE" })

    }
  };
  Projects.init({
    name: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: 'User',
        key: 'id',
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


  return Projects;
};