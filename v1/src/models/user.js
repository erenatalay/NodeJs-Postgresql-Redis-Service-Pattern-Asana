'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
         */
    static associate({ Projects,Section }) {
      this.hasMany(Projects, { foreignKey: 'user_id',onDelete : "CASCADE",onUpdate : "CASCADE" })
      this.hasMany(Section, { foreignKey: 'user_id',onDelete : "CASCADE",onUpdate : "CASCADE" })

    }
  };
  User.init({
    full_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    profile_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',

  });



  return User;
};