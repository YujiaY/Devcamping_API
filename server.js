const express = require('express');
const dotenv = require('dotenv');

//Routes files
const bootcamps = require('./routes/bootcamps');

//Load env vars
dotenv.config({path: './config/config.env'});

const app = express();

const logger = (req, res, next) => {
  req.hello = "Hello world from logger middleware.";
  console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}

app.use(logger);

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`
  )
);
