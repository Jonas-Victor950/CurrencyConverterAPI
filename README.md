# Currency Converter API

## Overview

This project was built to convert currencies between different countries and store each user's transactions.

## Technologies Used

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Zod (data validations)
- Pino (structured logs)
- Swagger (API documentation)
- Jest + Supertest (for tests)
- Render (for deployment)
- Docker Compose (for local database)

## Project Architecture

The project is structured as follows:

```
├── src
│   ├── app.ts                # Application entry point
│   ├── database              # Prisma client and database config
│   ├── middlewares           # Custom middlewares (fakeUser, errorHandler)
│   ├── modules
│   │   └── transactions      # Transaction logic (controller, service, DTO)
│   └── utils                 # Helper functions and classes (logger, ApiError)
├── prisma
│   └── schema.prisma         # Database schema
├── tests                     # Unit and integration tests
└── README.md
```

### 📁 modules/

Each main functionality of the system is separated into a module:

- **exchange/** – Handles currency conversion via external integration (CurrencyAPI).
- **transactions/** – Responsible for saving and listing conversion transactions made by users.

Each module contains:

- `controller/` – Functions that handle HTTP requests.
- `service/` – Business rules and integration between layers.
- `dto/` – Validation schemes and data types.
- `routes.ts` – Routes exposed by the API for that module.

### 📁 middlewares/

Contains global middlewares like:

- `fakeUser.ts` – Simulates user authentication.
- `errorHandler.ts` – Captures and handles unexpected errors in a standardized way.

### 📁 config/

Stores external configurations such as API keys and environment variables.

### 📁 database/

Prisma ORM setup and PostgreSQL database client instance.

### 📁 utils/

Utility functions and helper classes, such as `ApiError.ts` (custom error class) and `logger.ts` (structured logs with Pino).

### 🧪 tests/

Tests organized by type:

- `unit/` – Test services in isolation.
- `integration/` – They test the API as a whole, simulating real requests.

---

## Local Execution

### 1. Clone the repository

```bash
git clone https://github.com/Jonas-Victor950/CurrencyConverterAPI.git
cd CurrencyConverterAPI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database with Docker

> You must have Docker installed.

```bash
docker-compose up -d
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

And edit with your PostgreSQL database data and exchange API.

### 4. Start the database with Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Upgrade the server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

---

## 🧱 Deploy

You can easily upload the application on platforms such as:

- [Render](https://render.com)
- [Railway](https://railway.app)
- [Fly.io](https://fly.io)

### Example with Render

1. Create a PostgreSQL database in Render
2. Set the `DATABASE_URL` in `.env`
3. Connect the GitHub repository in Render
4. Add build command:

```bash
npm install && npm run build
```

And start command:

```bash
npm run start
```

5. Add environment variables
6. Access the generated URL to test
7. Already deployed on Render: https://currencyconverterapi-d27q.onrender.com (may take a few seconds to load on the free plan)

---

## Tests

To run unit and integration tests:

```bash
npm run test
```

## API Documentation

Swagger is available at:

```
/docs
```

## Useful Scripts

```bash
npm run dev         # Run in development
npm run build       # Compile TypeScript
npm run start       # Start in production
npm run test        # Run tests
```
