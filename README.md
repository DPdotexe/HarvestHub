# HarvestHub - Plant-Based Food Group Buying Management Platform

HarvestHub is a REST API built with Node.js and MySQL to support the operations of "Planty of Food" (POF), a company aiming to make plant-based food more accessible through group buying.

## Features

- User, product, and order management
- Creation, update, and deletion of users, products, and orders
- Order filtering by date
- Associations between users, products, and orders

## Installation

1. Clone the repository: `git clone https://github.com/DPdotexe/harvesthub.git`
2. Install dependencies: `npm install`
3. Configure the database and update the `.env` file with your database credentials
4. Run migrations: `npm run migrate`
5. Start the server: `npm start`

## Usage

### Users

- `POST /api/users`: Create a new user
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get a specific user
- `PUT /api/users/:id`: Update a user
- `DELETE /api/users/:id`: Delete a user

### Products

- `GET /api/products`: Get all products
- `POST /api/products`: Create a new product
- `GET /api/products/:id`: Get a specific product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

### Orders

- `GET /api/orders`: Get all orders
- `GET /api/orders/date`: Filter orders by date
- `GET /api/orders/:id`: Get a specific order
- `POST /api/orders`: Create a new order
- `PUT /api/orders/:id`: Update an order
- `DELETE /api/orders/:id`: Delete an order

## Environment Variables

- `DB_DATABASE`: MySQL database name
- `DB_USER`: MySQL database user name
- `DB_PASSWORD`: MySQL database password
- `DB_HOST`: MySQL database host
- `PORT`: Server port

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.
