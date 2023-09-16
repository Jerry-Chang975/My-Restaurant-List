'use strict';
const initData = require('./restaurant.json');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let transaction;
    try {
      transaction = await queryInterface.sequelize.transaction();
      await queryInterface.bulkInsert(
        'Users',
        await Promise.all(
          initData.users.map(async (user) => {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              password: hash,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          })
        ),
        {
          transaction,
        }
      );

      await queryInterface.bulkInsert(
        'Restaurants',
        initData.restaurants.map((restaurant) => {
          return {
            id: restaurant.id,
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: restaurant.userId,
          };
        }),
        {
          transaction,
        }
      );
      await transaction.commit();
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null, {});
  },
};
