const { DataTypes } = require('sequelize');

const Comment = (sequelize) => {
  const CommentModel = sequelize.define('Comment', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return CommentModel;
};

module.exports = Comment;