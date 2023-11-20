const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// models 
const Order = require('./models/Order');
const Product = require('./models/Product');
const User = require('./models/User');

// models associations
Order.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Something went wrong!' });
});

app.get('/', (req, res) => {
  res.send('Welcome to my homepage');
});

// sync models
async function startServer() {
  try {
    await User.sync();
    await Product.sync();
    await Order.sync();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error syncing models with database:', error);
  }
}

startServer();
