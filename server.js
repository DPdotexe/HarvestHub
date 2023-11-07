const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Define routes for managing users, products, and orders
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Define a route for the root (homepage)
app.get('/', (req, res) => {
  res.send('Welcome to my homepage');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
