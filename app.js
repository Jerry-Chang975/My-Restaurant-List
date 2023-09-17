const express = require('express');
const app = express();
// get env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3000;

const router = require('./routers');
const { engine } = require('express-handlebars');
require('./utils/handlebarsHelper');
const methodOverride = require('method-override');

const flash = require('connect-flash');
const errorHandler = require('./middlewares/error-handler');
const messageHandler = require('./middlewares/message-handler');

const session = require('express-session');
const passport = require('passport');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// template engine setting
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'));

// data parsing setting
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// passport setting
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(messageHandler);

app.use('/', router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`The restaurant app is listening on http://localhost:${port}`);
});
