module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: DataTypes.STRING,
      creatorId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {},
  )
  Comment.associate = function(models) {
    // associations can be defined here
  }
  return Comment
}
