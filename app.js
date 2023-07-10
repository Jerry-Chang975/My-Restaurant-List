const express = require('express');
const app = express();
const port = 3000;
const restaurants = require('./public/jsons/restaurant.json');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/restaurants');
});

app.get('/restaurants', (req, res) => {
  res.send('restaurants');
});

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id;
  res.send(`restaurant: ${id}`);
});

app.listen(port, () => {
  console.log(`The restaurant app listening on http://localhost:${port}`);
});
