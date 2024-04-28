require('dotenv').config();
const nodemailer = require("nodemailer");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');

const indexRoutes = require('./Router/index.routes');/*
const usersRouter = require('./routes/users.routes');
const productsRouter = require('./routes/products.routes');
const apisRouter = require('./routes/apis.routes');

const checkLocalSession = require('./middleware/checkLocalSession');
const checkCookie = require('./middleware/checkCookie');
const categories = require('./middleware/allCategories')*/

const session = require('express-session');

const app = express();

app
  .set('views', path.join(__dirname, 'View'))
  .set('view engine', 'ejs');

app
  .use(logger('dev'))
  .use(cookieParser())
  .use(methodOverride('_method'))

  // Middleware para formularios
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, '..', 'Public')))

  //Configuracion de sesion
  .use(session({
    secret: 'FreeLab',
    resave: true, 
    saveUninitialized: true
  }))
/*
  .use(categories)
  .use(checkCookie)
  .use(checkLocalSession)*/

  // Rutas
  .use('/', indexRoutes)

// Manejo de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejo de errores generales
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;