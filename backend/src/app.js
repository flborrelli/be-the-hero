const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(cors())
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));

module.exports = app;