require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

const middlewareUsuario = require('./utilities/middelwareUsuario.js');
const indexRouter = require('./routes/index.js');
const logIn = require('./routes/logIn.js');
const recibirMensajeRouter = require('./routes/recibirMensajeRest.js');
const usuariosPorAtender = require('./routes/usuariosPorAtender.js');
const logOut = require('./routes/logOut.js')
const atenderChat = require('./routes/atenderChat.js')

const cors = require('cors');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/favicon.ico', () => null)
app.use('/', indexRouter);
app.use('/logIn', logIn); // LogIn de los operadores 
app.use('/recibirMensaje', recibirMensajeRouter); // Recibir mensaje de microservisio de gestion_datos_ms

//app.use(middlewareUsuario); // Middleware que verifica el token con JWT sobre web Sockets
app.use('/logOut', logOut);
app.use('/usuariosPorAtender', usuariosPorAtender); // Obtener usuarios por atender
app.use('/atenderChat', atenderChat); // Atender chat


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
