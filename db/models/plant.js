module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define(
    'Plant',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      favorites: DataTypes.ARRAY(DataTypes.STRING),
      creatorId: DataTypes.INTEGER,
    },
    {},
  )
  Plant.associate = function(models) {
    // associations can be defined here
  }
  return Plant
}
