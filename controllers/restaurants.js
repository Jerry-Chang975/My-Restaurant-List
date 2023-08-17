const db = require('../models');
const Restaurant = db.Restaurant;
function getAllRestaurants(req, res) {
  const { keyword } = req.query;
  // condition search if keyword is not empty
  Restaurant.findAll({
    raw: true,
    where: keyword
      ? {
          [db.Sequelize.Op.or]: [
            {
              name: {
                [db.Sequelize.Op.like]: `%${keyword}%`,
              },
            },
            {
              name_en: {
                [db.Sequelize.Op.like]: `%${keyword}%`,
              },
            },
            {
              category: {
                [db.Sequelize.Op.like]: `%${keyword}%`,
              },
            },
          ],
        }
      : {},
  })
    .then((restaurants) => {
      res.render('index', { restaurants });
    })
    .catch((err) => {
      console.log(err);
    });
}
function getRestaurantById(req, res) {
  const { id } = req.params;
  return Restaurant.findByPk(id, { raw: true })
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((err) => console.log(err));
}

function getRestaurantEditPage(req, res) {
  const { id } = req.params;
  return Restaurant.findByPk(id, { raw: true })
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((err) => console.log(err));
}

function updateRestaurant(req, res) {
  const { id } = req.params;
  const {
    name,
    name_en,
    category,
    location,
    google_map,
    image,
    phone,
    rating,
    description,
  } = req.body;
  return Restaurant.update(
    {
      name,
      name_en,
      category,
      location,
      google_map,
      image,
      phone,
      rating,
      description,
    },
    { where: { id } }
  )
    .then((result) => {
      res.redirect(`/${id}`);
    })
    .catch((err) => console.log(err));
}

function getRestaurantCreatePage(req, res) {
  res.render('create');
}

function createRestaurant(req, res) {
  console.log({ ...req.body });
  return Restaurant.create({ ...req.body })
    .then((result) => res.redirect('/'))
    .catch((err) => {
      console.log(err);
      res.render('create', { restaurant: { ...req.body } });
    });
}

function deleteRestaurant(req, res) {
  const { id } = req.params;
  return Restaurant.destroy({ where: { id } })
    .then((result) => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantEditPage,
  getRestaurantCreatePage,
  updateRestaurant,
  createRestaurant,
  deleteRestaurant,
};
