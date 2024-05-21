var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/EngWeb2024'
mongoose.connect(mongoDB)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na ligação ao MongoDB'));
db.once('open', () => {
	console.log('Ligação ao MongoDB efetuada com sucesso');
});

var compositoresRouter = require('./routes/compositores');
var periodosRouter = require('./routes/periodos');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/compositores', compositoresRouter);
app.use('/periodos', periodosRouter);

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
