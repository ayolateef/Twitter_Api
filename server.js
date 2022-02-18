const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//Route files
const users = require('./routes/user');
const tweets = require('./routes/tweet');
 
dotenv.config();
// connect to database
connectDB();

const app = express();

//body parser
app.use(express.json());

app.use(logger);

//mount the router
app.use('api/v1/tweeps', users)
app.use('api/v1/tweets', tweets)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle unhandled promise rej ections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  
  //close server & exit process
  server.close(() => process.exit(0));
}); 