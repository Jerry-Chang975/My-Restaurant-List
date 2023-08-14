const express = require('express');
const app = express();
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
const { engine } = require('express-handlebars');
const restaurantRoute = require('./routers/restaurantRoute');

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', restaurantRoute);

app.listen(port, () => {
  console.log(`The restaurant app is listening on http://localhost:${port}`);
});
