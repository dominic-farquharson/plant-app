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
    Comment.belongsTo(models.User, { foreignKey: 'creatorId' })
  }
  return Comment
}
