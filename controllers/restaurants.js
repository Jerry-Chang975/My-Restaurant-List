const db = require('../models');
const { Op } = require('sequelize');
const Restaurant = db.Restaurant;
const sortOptions = ['name', 'name', 'category', 'location'];
function getRestaurantsByUser(req, res) {
  const { keyword, sort } = req.query;
  console.log(req.user);
  // condition search if keyword is not empty
  Restaurant.findAll({
    raw: true,
    where: keyword
      ? {
          [Op.and]: [
            {
              [Op.or]: [
                {
                  name: {
                    [Op.like]: `%${keyword}%`,
                  },
                },
                {
                  name_en: {
                    [Op.like]: `%${keyword}%`,
                  },
                },
                {
                  category: {
                    [Op.like]: `%${keyword}%`,
                  },
                },
              ],
            },
            {
              userId: req.user.id,
            },
          ],
        }
      : { userId: req.user.id },
    order: [
      [
        sort ? sortOptions[Number(sort)] : 'name',
        sort === '1' ? 'DESC' : 'ASC',
      ],
    ],
  })
    .then((restaurants) => {
      res.render('index', { restaurants, keyword, sort, user: req.user });
    })
    .catch((err) => {
      console.log(err);
    });
}
function getRestaurantById(req, res) {
  const { id } = req.params;
  return Restaurant.findByPk(id, { raw: true })
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', 'Restaurant not found');
        return res.redirect('/restaurants');
      }
      if (restaurant.userId !== req.user.id) {
        req.flash('error', 'You are not authorized to view this restaurant');
        return res.redirect('/restaurants');
      }
      return res.render('detail', { restaurant, user: req.user });
    })
    .catch((err) => {
      console.log(err);
      err.errorMessage = 'restaurant not found';
    });
}

function getRestaurantEditPage(req, res) {
  const { id } = req.params;
  return Restaurant.findByPk(id, { raw: true })
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', 'Restaurant not found');
        return res.redirect('/restaurants');
      }
      if (restaurant.userId !== req.user.id) {
        req.flash('error', 'You are not authorized to edit this restaurant');
        return res.redirect('/restaurants');
      }
      return res.render('edit', { restaurant, user: req.user });
    })
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
  return Restaurant.findByPk(id, { raw: true }).then((restaurant) => {
    if (!restaurant) {
      req.flash('error', 'Restaurant not found');
      return res.redirect('/restaurants');
    }
    if (restaurant.userId !== req.user.id) {
      req.flash('error', 'You are not authorized to edit this restaurant');
      return res.redirect('/restaurants');
    }
    Restaurant.update(
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
        res.redirect(`/restaurants/${id}`);
      })
      .catch((err) => console.log(err));
  });
}

function getRestaurantCreatePage(req, res) {
  res.render('create', { user: req.user });
}

function createRestaurant(req, res) {
  console.log({ ...req.body });
  return Restaurant.create({ ...req.body, userId: req.user.id })
    .then((result) => {
      res.redirect(`/restaurants/${result.id}`);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
      res.render('create', { restaurant: { ...req.body }, user: req.user });
    });
}

function deleteRestaurant(req, res) {
  const { id } = req.params;
  return Restaurant.findByPk(id, { raw: true }).then((restaurant) => {
    if (!restaurant) {
      req.flash('error', 'Restaurant not found');
      return res.redirect('/restaurants');
    }
    if (restaurant.userId !== req.user.id) {
      req.flash('error', 'You are not authorized to remove this restaurant');
      return res.redirect('/restaurants');
    }
    Restaurant.destroy({ where: { id } })
      .then((result) => {
        res.redirect('/restaurants');
      })
      .catch((err) => console.log(err));
  });
}

module.exports = {
  getRestaurantsByUser,
  getRestaurantById,
  getRestaurantEditPage,
  getRestaurantCreatePage,
  updateRestaurant,
  createRestaurant,
  deleteRestaurant,
};
