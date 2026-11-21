<div align="center">

# 🏘️ RENTIFUL API
**The data foundation behind the rental journey.**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![PostGIS](https://img.shields.io/badge/PostGIS-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

An API in development for tenants, properties and the relationships that connect a rental platform.

[Frontend repository](https://github.com/Abdelhakam23/rentlful)

</div>

---

## 📖 Table of contents

- [Current scope](#current-scope)
- [API surface](#api-surface)
- [Data model](#data-model)
- [Local development](#local-development)
- [Project map](#project-map)
- [Scripts](#scripts)
- [Next milestones](#next-milestones)

---

> **Early development.** Tenant handlers and the relational schema are present. Authentication hardening, ownership checks and the wider property workflow remain prerequisites for deployment.

---

<a id="current-scope"></a>

## ✨ Current scope

### Implemented in source

- An Express server with JSON/form parsing, CORS, Helmet and request logging.
- Prisma with the PostgreSQL driver adapter.
- A relational schema and initial migration covering the rental domain.
- A PostGIS-backed geographic location field.
- Tenant lookup by Cognito identifier, including favorite property records.
- Tenant creation from profile fields.
- Bearer-token parsing and a tenant-role middleware foundation.
- Seed fixtures and a database seeding script for development.

### Not complete yet

Manager routes, property discovery, favorite updates, applications, leases, payments and S3 upload operations are not implemented API workflows yet. Their models or installed dependencies do not imply completed features. AWS deployment is not documented or verified here.

---

<a id="api-surface"></a>

## 📡 API surface

Default local base URL: `http://localhost:3002`.

| Method | Route | Current behavior |
| --- | --- | --- |
| `GET` | `/tenants/:id` | Look up a tenant by Cognito ID; include favorites |
| `POST` | `/tenants` | Create a tenant profile |

Both routes pass through the current tenant-role middleware. Profile creation currently expects `cognitoId`, `name`, `email` and `phoneNumber` in the JSON body.

> **Development-only boundary:** the authentication and record-ownership checks are not deployment-ready. Complete verified token validation, identity-bound profile access and request validation before exposing real user data. No live credentials or production data belong in development fixtures.

---

<a id="data-model"></a>

## 🗄️ Data model

The schema defines the destination of the API, beyond the two implemented routes:

| Model | Responsibility |
| --- | --- |
| `Manager` | Manages properties |
| `Tenant` | Holds profile, favorites, applications and leases |
| `Property` | Rental details, amenities, pricing and relationships |
| `Location` | Address fields and a PostGIS geographic point |
| `Application` | Tenant application for a property; optional linked lease |
| `Lease` | Rental dates, rent, deposit and linked payments |
| `Payment` | Amounts, dates and payment status records |

Payment records are data structures, not a payment-processing integration.

---

<a id="local-development"></a>

## 🚀 Local development

### Prerequisites

- Node.js/npm compatible with the dependencies in `package-lock.json`.
- A disposable development PostgreSQL database with PostGIS available.
- Permission to create the PostGIS extension used by the initial migration.

Keep both repositories next to each other. The API's Prisma generation lifecycle copies generated frontend types into `../rentlful/types/prisma`.

```text
workspace/
  rentiful-api/
  rentlful/
```

```bash
git clone https://github.com/Abdelhakam23/rentiful-api.git
git clone https://github.com/Abdelhakam23/rentlful.git
cd rentiful-api
npm ci
```

Create `.env` in the API root, then fill in your local database connection string:

```dotenv
DATABASE_URL=
PORT=3002
```

Do not commit `.env` or reuse a production database for development.

### Generate and migrate

The Prisma config file is named **`prisma7.config.ts`**, so pass it explicitly:

```bash
npm run prisma:generate -- --config prisma7.config.ts
npx prisma migrate deploy --config prisma7.config.ts
npm run dev
```

The generation command also runs `postprisma:generate`, replacing generated Prisma files in the sibling frontend directory. Run it only in the intended two-repository workspace.

### Optional seed data

**Destructive operation:** the seed script deletes existing records before inserting fixtures. Use only an empty or disposable local database after confirming `DATABASE_URL`.

```bash
npm run seed
```

Use a local database while completing and testing the tenant workflow. Production deployment is a later milestone.

---

<a id="project-map"></a>

## 📂 Project map

```text
src/
  server.ts                    Express setup and mounted routes
  config/db.ts                 Prisma PostgreSQL adapter
  middleware/AuthMiddleware.ts Auth/role middleware foundation
  features/tenants/
    routes/                    Tenant routes
    controllers/               Tenant database operations
prisma/
  schema.prisma                Domain models and relationships
  migrations/                  Initial schema migration
  seed.ts                      Development seeding script
  seedData/                    JSON fixtures
prisma7.config.ts              Prisma CLI configuration
```

---

<a id="scripts"></a>

## ⚙️ Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run server watch and TypeScript checking |
| `npm run build` | Compile source into `dist` |
| `npm start` | Start the compiled server |
| `npm run prisma:generate -- --config prisma7.config.ts` | Generate Prisma client and sync frontend types |
| `npm run seed` | Replace development data with fixtures |

No automated test script is currently defined.

---

<a id="next-milestones"></a>

## 🗺️ Next milestones

- [ ] Complete verified Cognito token validation and ownership checks.
- [ ] Add request validation and consistent error responses.
- [ ] Complete tenant profile creation from the authenticated identity.
- [ ] Add property list/search/detail endpoints.
- [ ] Implement favorites and manager routes.
- [ ] Add tests for unauthorized, expired-token and cross-user requests.
- [ ] Build applications and leases after the core tenant journey works.

---

<div align="center">

**Model the domain. Connect the journey. Ship verified behavior.**

Companion client: [`rentlful`](https://github.com/Abdelhakam23/rentlful)

</div>
