const db = require("../models");
const Restaurant = db.Restaurant;
function getAllRestaurants(req, res) {
  return Restaurant.findAll({ raw: true })
    .then((restaurants) => {
      res.render("index", { restaurants });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getRestaurantById(req, res) {
  const id = req.params.id;
  return Restaurant.findByPk(id, { raw: true })
    .then((restaurant) => res.render("detail", { restaurant }))
    .catch((err) => console.log(err));
}

function updateRestaurant(req, res) {}

function createRestaurant(req, res) {}

function deleteRestaurant(req, res) {}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  createRestaurant,
  deleteRestaurant,
};
