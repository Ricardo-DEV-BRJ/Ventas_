var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
require('dotenv').config()
const usuarioRouter = require('./routes/usuarios')
const proveedorRouter = require('./routes/proveedores')
const categoriasRouter = require('./routes/categorias')
const productosRouter = require('./routes/productos')
const clientesRouter = require('./routes/clientes')
const ventasRouter = require('./routes/ventas')
var cors = require('cors')

const corsEndpoint = process.env.CORS_PORT
//const PORT = 3000;
// view engine setup
app.use(cors({
  origin: [corsEndpoint],
  methods: 'GET,POST,PUT,DELETE'
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', usuarioRouter);
app.use('/proveedor', proveedorRouter);
app.use('/categorias', categoriasRouter);
app.use('/productos', productosRouter);
app.use('/clientes', clientesRouter);
app.use('/ventas', ventasRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
