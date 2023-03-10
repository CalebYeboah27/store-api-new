require('dotenv').config();
require('express-async-errors');

// Async errors

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFoundMiddleWare = require('./middleware/not-found');
const errorMiddleWare = require('./middleware/error-handler');

// middleware
app.use(express.json());

// Routes;
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

// Product Route
app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on Port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();