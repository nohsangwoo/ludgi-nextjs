# LUDGI's nextjs Project Setup and Documentation

## Node Version
Ensure you are using the following Node.js version:
- **v22.12.0**

---

## Installation and Running the Project

### Package Installation
```bash
pnpm install
```

### Start the Project
```bash
pnpm run dev
```

---

## PostgreSQL Setup

### Start PostgreSQL Service
```bash
cd docker-compose/postgres
docker compose -f postgres-compose.yml up --build -d
```

### Access PostgreSQL Container
```bash
docker exec -it postgres_db bash
```

### Connect to the Database
Ensure the database `mydb` is created and configured properly.
```bash
psql -U postgres -d mydb
```

### Shut Down PostgreSQL Service
```bash
docker compose -f postgres-compose.yml down
```

### Manage Volumes
- **List Volumes**
  ```bash
  docker volume ls
  ```
- **Inspect Volume**
  ```bash
  docker volume inspect postgres_db_volume
  ```
- **Remove Volume**
  ```bash
  docker volume rm postgres_db_volume
  ```

### PostgreSQL Commands
- **Show Port**
  ```bash
  psql -U postgres -d mydb -c "SHOW PORT;"
  ```
- **List Users**
  ```bash
  psql -U postgres -d mydb -c "\du"
  ```
- **List Databases**
  ```bash
  psql -U postgres -d mydb -c "\l"
  ```
- **Create Database**
  ```bash
  psql -U postgres -d mydb -c "CREATE DATABASE mydb;"
  ```
- **Create Table**
  ```bash
  psql -U postgres -d mydb -c "CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255));"
  ```
- **Create User**
  ```bash
  psql -U postgres -d mydb -c "CREATE USER myuser WITH PASSWORD 'mypassword';"
  ```
- **Grant Privileges**
  ```bash
  psql -U postgres -d mydb -c "GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;"
  ```

---

## Prisma Setup

### Database Migration
```bash
npx prisma migrate dev
```

### Open Prisma Studio
```bash
npx prisma studio
```

### Generate Prisma Client Code
```bash
npx prisma generate
```

---

## GraphQL Code Generation
- Refer to the following resources:
  - [GraphQL Documentation](https://www.npmjs.com/package/graphql)
  - [Code Generation Guide](https://the-guild.dev/graphql/codegen)

---

## Code Analysis

### Run Bundle Analysis
```bash
npx run analyze
```

---

## CLI Usage
This project uses `commander` and `inquirer` for an intuitive command-line interface.

- **Version**
  ```bash
  npx ludgi-cli -V
  ```
- **Create Command**
  ```bash
  npx ludgi-cli -n getUserProfile
  ```
- **Delete Command**
  ```bash
  npx ludgi-cli -d
  ```
- **List Commands**
  ```bash
  npx ludgi-cli -l
  ```

---

## React Hook Form with Zod
- Resources:
  - [React Hook Form](https://react-hook-form.com/get-started#SchemaValidation)
  - [Resolvers for Zod](https://github.com/react-hook-form/resolvers?tab=readme-ov-file#zod)

---

## Next-Safe-Action
- Documentation: [Next-Safe-Action](https://next-safe-action.dev/docs/getting-started)

---

## ESLint Setup
- Documentation:
  - [Next.js ESLint Configuration](https://nextjs.org/docs/app/api-reference/config/eslint)
  - [Prettier ESLint Config](https://github.com/prettier/eslint-config-prettier)

---

## Storybook
- Documentation: [Storybook](https://storybook.js.org/)
- Start Storybook:
  ```bash
  npm run storybook
  ```

---

## Cypress
- Documentation: [Cypress](https://www.cypress.io/)
- Open Cypress:
  ```bash
  npm run cy:open
  ```

---

## Redis Setup

### Start Redis Container
```bash
sh docker-compose/redis/up.sh
```

### Start Redis in Background
```bash
docker compose -f docker-compose/redis/redis-compose.yml up -d
```

### Configure Password
Update `.env` file to reflect the new password.
```bash
docker exec redis_cache redis-cli CONFIG SET requirepass ludgi1234
```

### Verify Password
```bash
docker exec redis_cache bash -c 'echo "PING" | redis-cli -a ludgi1234 2>/dev/null'
```

### Stop Redis Container
```bash
docker compose -f docker-compose/redis/redis-compose.yml down
```

### Access Redis CLI in Docker
```bash
docker exec -it redis_cache redis-cli
```

---

## Dummy Data Generation
Generate dummy data for development purposes:
```bash
npx tsx scripts/createDummyData.ts
```

---

## RabbitMQ

### Start RabbitMQ Container
```bash
docker compose -f docker-compose/rabbitmq/rabbitmq-compose.yml up -d
```

### Stop RabbitMQ Container
```bash
docker compose -f docker-compose/rabbitmq/rabbitmq-compose.yml down
```

### Access RabbitMQ Management Console
- URL: [http://localhost:15672/](http://localhost:15672/)
- Default Credentials:
  - Username: `admin`
  - Password: `admin123`

---

## Prometheus and Grafana

### Start Prometheus and Grafana
```bash
docker compose -f docker-compose/prometheus_grafana/prometheus-grafana-compose.yml up -d
```

### Access Web Interfaces
- **Prometheus**: [http://localhost:9090](http://localhost:9090)
- **Grafana**: [http://localhost:8081](http://localhost:8081)

---

## Next.js Integration
Install Prometheus client for metrics:
```bash
npm install prom-client
```

- Metrics Endpoint: `/api/metrics`
- Example API: `/api/example`

---

## GraphQL

### Field Selection
- Refer to the [Field Selection Documentation](https://www.graphql-java.com/documentation/field-selection/).

### Resolvers
- Learn more about [GraphQL Resolvers](https://graphql.org/learn/execution/).

---

## Type Definitions and Descriptions

| Type Definition | Description                     | Example                |
|-----------------|---------------------------------|-------------------------|
| Root Type       | Entry point for API requests   | Query, Mutation         |
| Custom Type     | Data structure used by API     | User, Post, Comment     |

---

# ludgi-nextjs
