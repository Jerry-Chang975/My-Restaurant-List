const express = require('express');
const app = express();
const port = 3000;
const restaurants = require('./public/jsons/restaurant.json').results;
const { engine } = require('express-handlebars');

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/restaurants');
});

app.get('/restaurants', (req, res) => {
  res.render('index', { restaurants });
});

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  const matchedRestaurant = restaurants.find(
    (restaurant) => restaurant.id.toString() === id
  );
  res.render('detail', { restaurant: matchedRestaurant });
});

app.listen(port, () => {
  console.log(`The restaurant app listening on http://localhost:${port}`);
});
