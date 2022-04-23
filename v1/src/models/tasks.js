const logger = require("../scripts/logger/Tasks")
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
    static associate({User,Projects,Section,Comments}) {
      this.belongsTo(User, { foreignKey: 'user_id', onDelete: "CASCADE", onUpdate: "CASCADE" })
      this.belongsTo(Projects, { foreignKey: 'project_id', onDelete: "CASCADE", onUpdate: "CASCADE" })
      this.belongsTo(Section, { foreignKey: 'section_id', onDelete: "CASCADE", onUpdate: "CASCADE" })
      this.belongsTo(Comments, { foreignKey: 'comments_id', onDelete: "CASCADE", onUpdate: "CASCADE" })


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
    section_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Section',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
 

    },
    order: {
      type: DataTypes.INTEGER
    },
    isComplated: {
      type: DataTypes.BOOLEAN
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
    hooks: {
      afterCreate: function (doc) {
        logger.log({
          level: "info",
          message: doc
        })
      }
    },
  });
  return Tasks;
};