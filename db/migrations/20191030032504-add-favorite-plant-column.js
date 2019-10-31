module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.addColumn(
          'Users',
          'favoritePlant',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Plants',
              key: 'id',
            },
          },
          { transaction: t },
        ),
      ]),
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.removeColumn('Users', 'favoritePlant', {
          transaction: t,
        }),
      ]),
    ),
}
