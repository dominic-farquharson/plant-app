module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      favoritePlant: DataTypes.INTEGER,
    },
    {},
  )
  User.associate = function(models) {
    // associations can be defined here
  }
  return User
}
