'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User,Projects}) {
      this.belongsTo(User, { foreignKey: 'user_id', onDelete: "CASCADE", onUpdate: "CASCADE" })
      this.belongsTo(Projects, { foreignKey: 'project_id', onDelete: "CASCADE", onUpdate: "CASCADE" })
      // define association here
    }
  };
  Section.init({
    name: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: 'User',
        key: 'id',
      },
    },
    project_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: 'Projects',
        key: 'id',
      },
    },
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Section',
  });
  return Section;
};