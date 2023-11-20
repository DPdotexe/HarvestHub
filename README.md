# HarvestHub - Planty of Food (POF) Group Purchasing API

## Overview
HarvestHub is a comprehensive REST API developed with Node.js, Express, Sequelize, and MySQL. The platform aims to facilitate the exchange and accessibility of plant-based food, with a special emphasis on group purchasing initiatives for Planty of Food (POF).

## Planty of Food (POF) Integration
Planty of Food (POF) is a forward-thinking company committed to making plant-based food more accessible. As part of this vision, HarvestHub includes a dedicated platform for group purchasing, separate from the primary e-commerce system. Your role is to contribute to the realization of this group purchasing platform by developing RESTful JSON APIs.

## Project Structure
- `controllers/`: Contains controllers to handle API logic.
- `models/`: Contains Sequelize models for database tables.
- `routes/`: Contains route definitions for the APIs.
- `migrations/`: Contains Sequelize migrations to create tables in the database.
- `server.js`: The main file that starts the Express server.

## Installation
1. Clone the repository: `git clone <repository_url>`
2. Install dependencies: `npm install`
3. Run database migrations: `npx sequelize-cli db:migrate --url mysql://username:password@localhost:3306/database`
4. Start the server: `npm start`

## Environment Variables
Create a `.env` file in the project root with the following variables:

DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name
PORT=3000


## Main Dependencies
- Node.js
- Express
- Sequelize
- MySQL


## API Endpoints
- **Create a Group Purchase:** `POST /api/group-purchases`
- **Get Group Purchases:** `GET /api/group-purchases`
- **Get Group Purchase by ID:** `GET /api/group-purchases/:id`
- **Update Group Purchase:** `PUT /api/group-purchases/:id`
- **Delete Group Purchase:** `DELETE /api/group-purchases/:id`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss proposed changes.

## License
This project is licensed under the [ISC License](LICENSE).
