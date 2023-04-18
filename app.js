require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index.js');
const logIn = require('./routes/logIn.js');
const recibirMensajeRouter = require('./routes/recibirMensaje.js');
const usuariosPorAtender = require('./routes/usuariosPorAtender.js');

const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/favicon.ico', () => null)
app.use('/', indexRouter);
app.use('/logIn', logIn); // LogIn de los operadores 
app.use('/recibirMensaje', recibirMensajeRouter); // Recibir mensajes de los clientes

//Acá debe ir un middleware que verifique el token con JWT
//Usando app.use(middleware) donde middleware es la función que verifica el token

app.use('/usuariosPorAtender', usuariosPorAtender); // Obtener usuarios por atender

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
