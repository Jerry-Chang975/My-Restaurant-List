const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { engine } = require('express-handlebars');
const restaurantRoute = require('./routers/restaurantRoute');

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'));

app.use('/', restaurantRoute);

// app.get('/restaurants', (req, res) => {
//   const keyword = req.query.keyword;
//   const matchedRestaurants = keyword
//     ? restaurants.filter((restaurant) => {
//         // check name, category, description properties of restaurant
//         const checkKey = ['name', 'category', 'description'];
//         return Object.keys(restaurant).some((key) => {
//           if (checkKey.includes(key)) {
//             return restaurant[key]
//               .toLowerCase()
//               .includes(keyword.toLowerCase());
//           } else {
//             return false;
//           }
//         });
//       })
//     : restaurants;
//   res.render('index', { restaurants: matchedRestaurants, keyword });
// });

// app.get('/restaurants/:id', (req, res) => {
//   const id = req.params.id;
//   const matchedRestaurant = restaurants.find(
//     (restaurant) => restaurant.id.toString() === id
//   );
//   res.render('detail', { restaurant: matchedRestaurant });
// });

app.listen(port, () => {
  console.log(`The restaurant app is listening on http://localhost:${port}`);
});
