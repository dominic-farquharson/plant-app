module.exports = {
  up: queryInterface =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.bulkInsert(
          'Users',
          [
            {
              firstName: 'jane',
              lastName: 'doe',
              email: 'jane@doe.com',
              password: 'thispasswordshouldbehashed',
            },
          ],
          { transaction: t },
        ),
        queryInterface.bulkInsert(
          'Plants',
          [
            {
              title: 'Roses',
              description: 'The perfect gift.',
              imageUrl:
                'https://www.jacksonandperkins.com/images/xxl/v2203.jpg',
              creatorId: 1,
              favorites: [1],
            },
            {
              title: 'Lotus Flower',
              description:
                'One of two extant species of aquatic plant in the family Nelumbonaceae. It is often colloquially called a water lily.',
              imageUrl:
                'https://paulhaider.files.wordpress.com/2014/04/lotus-flower.jpg',
              creatorId: 1,
            },
            {
              title: 'Red Anthurium Flower',
              description:
                'Anthurium, is a genus of about 1000 species of flowering plants, the largest genus of the arum family, Araceae.',
              imageUrl:
                'https://2.bp.blogspot.com/-HD2vWHRZuKM/Tk5zjMHiT0I/AAAAAAAAGCY/Ut99VR3QaYE/s1600/Red-anthurium-flower.jpg',
              creatorId: 1,
            },
            {
              title: 'Hoya Macgillivrayi',
              description:
                'Hoya macgillivrayi is a fast-growing vine native to northeastern Australia that was first discovered in Queensland in the McIlwraith and Tozer Range by Frederick Manson Bailey.',
              imageUrl:
                'https://worldoffloweringplants.com/wp-content/uploads/2014/10/Hoya-macgillivrayi2.jpg',
              creatorId: 1,
            },
          ],
          { transaction: t },
        ),
        queryInterface.bulkInsert(
          'Comments',
          [
            {
              content: 'What a beautiful plant!',
              creatorId: 1,
              postId: 1,
            },
            {
              content: 'What a beautiful plant!',
              creatorId: 1,
              postId: 2,
            },
            {
              content: 'What a beautiful plant!',
              creatorId: 1,
              postId: 3,
            },
            {
              content: 'What a beautiful plant!',
              creatorId: 1,
              postId: 4,
            },
          ],
          { transaction: t },
        ),
      ]),
    ),

  down: queryInterface =>
    queryInterface.sequelize.transaction(t =>
      Promise.all([
        queryInterface.bulkDelete('Users', null, { transaction: t }),
        queryInterface.bulkDelete('Comments', null, { transaction: t }),
        queryInterface.bulkDelete('Plants', null, { transaction: t }),
      ]),
    ),
}
