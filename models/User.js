const { DataTypes } = require('sequelize');

const User = (sequelize) => {
  const UserModel = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.INTEGER, // Corrected data type to INTEGER
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return UserModel;
};

module.exports = User;
