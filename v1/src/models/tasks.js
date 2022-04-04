'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tasks.init({
    title: DataTypes.STRING,
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
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: 'Project',
        key: 'id',
      },
    },
    sub_task : {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tasks',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    media : {
      type: DataTypes.JSON,
      get() {
        return JSON.parse(this.getDataValue("proofResources"));
      }, 
      set(value) {
        return this.setDataValue("proofResources", JSON.stringify(value));
      }

    },
    assigned_to: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    description: {
      type: DataTypes.STRING
    },
    statues : {
      type: DataTypes.JSON,
      get() {
        return JSON.parse(this.getDataValue("statues"));
      }, 
      set(value) {
        return this.setDataValue("statues", JSON.stringify(value));
      }

    },
    order: {
      type: DataTypes.INTEGER
    },

    comments_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comments',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};