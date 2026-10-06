# Nexus CRM System

A full-stack **Customer Relationship Management (CRM)** application for managing leads, tracking sales pipeline progress, and collaborating through a secure, role-aware dashboard. It combines a React/Vite frontend with a Node.js/Express backend, a PostgreSQL database, and Docker-based deployment to AWS Lightsail.

---

## ✨ Key Features

- **Secure Authentication** — Register and log in with password hashing (bcrypt) and JWT-based session management. Client-side route guards ensure only authenticated users reach the app.
- **Lead Management** — Full CRUD for customer leads, with search and filtering by status, source, and salesperson.
- **Kanban Pipeline Board** — Interactive drag-and-drop board (`@hello-pangea/dnd`) to move leads across the six sales stages: `New`, `Contacted`, `Qualified`, `Proposal Sent`, `Won`, and `Lost`.
- **Lead Notes** — Add and view timeline notes on individual leads.
- **Dashboard Metrics** — Aggregated KPIs (total leads, new/qualified/won/lost counts, and pipeline value) fetched from a dedicated endpoint.
- **CSV Import / Export** — Bulk-import leads from a `.csv` file (Multer + csv-parser) and export the current pipeline to CSV (json2csv).
- **Input Validation** — Server-side validation with `express-validator` for names, emails, phone numbers, deal values, and statuses.
- **Firebase Data Connect** — GraphQL schema and connectors for the CRM data model (lead/note) with generated client/admin SDKs.
- **Containerized & CI/CD** — Docker images for both services, a `docker-compose` setup, and GitHub Actions for automated Playwright tests and AWS Lightsail deployment.

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
| --- | --- |
| **React 19** + **Vite 8** | Fast, modern UI with hot module reload |
| **React Router 7** | Client-side, auth-protected routing |
| **@hello-pangea/dnd** | Drag-and-drop Kanban pipeline board |
| **Axios** | API communication with a JWT interceptor |
| **Lucide React** | Iconography |
| **Vanilla CSS** (CSS variables) | Custom dark, glassmorphism theme |
| **Playwright** | End-to-end testing |
| **Nginx** | Production static serving (Docker) |

### Backend
| Technology | Purpose |
| --- | --- |
| **Node.js 22** + **Express 5** | REST API server |
| **Sequelize 6** | ORM and data models |
| **PostgreSQL** | Relational database (AWS RDS) |
| **bcryptjs** | Password hashing |
| **JSON Web Tokens (jsonwebtoken)** | Stateless authentication |
| **express-validator** | Request validation |
| **Multer / csv-parser / json2csv** | CSV import & export |
| **Firebase Data Connect** | GraphQL schema, connectors & generated SDKs |

---

## 📂 Project Structure

```
CRM/
├── backend/
│   ├── config/
│   │   ├── database.js        # Sequelize + PostgreSQL connection
│   │   └── crm.db             # Legacy SQLite database (unused by the server)
│   ├── controllers/
│   │   ├── authController.js  # Register & login (bcrypt + JWT)
│   │   ├── dashboardController.js
│   │   ├── leadController.js  # Lead CRUD, status, CSV import/export
│   │   └── noteController.js  # Notes per lead
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── index.js           # Sequelize associations
│   │   ├── User.js
│   │   ├── Lead.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── leadRoutes.js
│   ├── dataconnect/           # Firebase Data Connect schema & connectors
│   ├── src/                   # Generated Data Connect SDKs
│   ├── uploads/               # Temporary CSV upload storage
│   ├── server.js              # Express entry point
│   ├── seed.js                # Legacy SQLite seeder (not wired to the server)
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Leads.jsx
│   │   │   ├── LeadDetails.jsx
│   │   │   └── KanbanBoard.jsx
│   │   ├── services/
│   │   │   └── api.js         # Axios instance + API helpers
│   │   ├── App.jsx            # Routing & auth guard
│   │   ├── main.jsx           # React entry point
│   │   ├── index.css          # Theme & design system
│   │   └── App.css
│   ├── tests/e2e/             # Playwright specs (auth, dashboard, leads, kanban)
│   ├── public/
│   ├── Dockerfile             # Multi-stage build → Nginx
│   ├── nginx.conf
│   ├── vite.config.js
│   ├── playwright.config.js
│   └── package.json
│
├── .github/workflows/
│   ├── deploy.yml             # Deploy to AWS Lightsail
│   └── playwright.yml         # CI E2E tests
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 recommended)
- [Docker](https://www.docker.com/) & Docker Compose (for containerized runs)
- A PostgreSQL database (AWS RDS or local) with the connection details below

### Environment Variables

Create a `.env` file in the `backend/` directory (and optionally `frontend/`):

**`backend/.env`**

```env
DB_HOST=<postgres-host>
DB_PORT=5432
DB_USER=<db-user>
DB_PASSWORD=<db-password>
DB_NAME=<db-name>
JWT_SECRET=<long-random-secret>
```

**`frontend/.env`** *(optional — used for Firebase config at build time)*

```env
VITE_API_URL=http://localhost:5001/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

> **Note:** `.env` files are git-ignored and must be supplied via environment or CI secrets in production.

### 1. Install & Run Locally

```bash
# Backend
cd backend
npm install
node server.js            # or: npm start
# → http://localhost:5001

# Frontend (new terminal)
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

The backend automatically syncs the Sequelize models with the database on startup.

### 2. Run with Docker

```bash
docker-compose up --build
```

| Service | URL |
| --- | --- |
| Frontend (Nginx) | http://localhost:8080 |
| Backend (API) | http://localhost:5001 |

---

## 🔌 API Reference

All endpoints are prefixed with `/api`. Protected routes require an `Authorization: Bearer <token>` header.

### Auth
| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Create a new user & return a JWT | — |
| POST | `/api/auth/login` | Authenticate & return a JWT | — |

### Dashboard
| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| GET | `/api/dashboard` | Aggregated pipeline metrics | ✅ |

### Leads
| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| GET | `/api/leads` | List leads (supports `search`, `status`, `source`, `salesperson`) | ✅ |
| POST | `/api/leads` | Create a lead | ✅ |
| GET | `/api/leads/:id` | Get a single lead | ✅ |
| PUT | `/api/leads/:id` | Update a lead | ✅ |
| PATCH | `/api/leads/:id/status` | Update a lead's status | ✅ |
| DELETE | `/api/leads/:id` | Delete a lead | ✅ |
| GET | `/api/leads/export` | Export leads to CSV | ✅ |
| POST | `/api/leads/import` | Import leads from CSV (`file` field) | ✅ |

### Notes
| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| GET | `/api/leads/:id/notes` | List notes for a lead | ✅ |
| POST | `/api/leads/:id/notes` | Add a note to a lead | ✅ |

### Data Model

- **User** — `id` (UUID), `name`, `email` (unique), `password` (hashed).
- **Lead** — `id` (UUID), `name`, `company`, `email`, `phone`, `source`, `salesperson`, `status`, `value`.
- **Note** — `id` (UUID), `content`, `createdBy`, `createdByName`, `leadId` (FK → Lead, cascade delete).

---

## 🧪 Testing

End-to-end tests are written with **Playwright** and live in `frontend/tests/e2e/`:

```bash
cd frontend
npm run test:e2e           # headless
npm run test:e2e:headed    # with a visible browser
npm run test:e2e:ui        # interactive UI mode
```

The test suite covers the authentication flow, dashboard metrics/navigation, full lead lifecycle (create/view/edit/note/delete), and Kanban drag-and-drop.

---

## 🚢 CI/CD & Deployment

GitHub Actions workflows in `.github/workflows/`:

- **`playwright.yml`** — Installs dependencies, starts the backend, installs Playwright browsers, and runs the E2E suite on push/PR to `main`/`master`, uploading the HTML report as an artifact.
- **`deploy.yml`** — On push to `main` (or manual trigger), creates the Firebase service account key and frontend `.env` from GitHub Secrets, SCPs the code to an AWS Lightsail instance, then rebuilds the Docker containers via `docker-compose`.

### Required GitHub Secrets
`LIGHTSAIL_IP`, `LIGHTSAIL_USERNAME`, `LIGHTSAIL_SSH_KEY`, `FIREBASE_SERVICE_ACCOUNT_KEY`, and the `VITE_FIREBASE_*` variables.

---

## 📝 Notes

- The backend is currently backed by **PostgreSQL via Sequelize**. A legacy SQLite `crm.db` and `seed.js` remain in the repo from an earlier iteration but are **not** wired into `server.js`.
- The currency is displayed as **LKR** (Sri Lankan Rupee) in the UI.
- Frontend Firebase configuration is present in the build pipeline, but authentication is handled by the backend JWT flow (`App.jsx` notes that the Firebase auth listener was removed).
- `docker-compose.yml` intentionally does **not** mount a database volume for the config directory so the Firebase `serviceAccountKey.json` is preserved inside the container.
