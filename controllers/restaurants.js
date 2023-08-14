const db = require('../models');
const Restaurant = db.Restaurant;
function getAllRestaurants(req, res) {
  return Restaurant.findAll({ raw: true })
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

function createRestaurant(req, res) {}

function deleteRestaurant(req, res) {}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantEditPage,
  updateRestaurant,
  createRestaurant,
  deleteRestaurant,
};
