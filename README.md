# Nexus CRM System

A full-stack Customer Relationship Management (CRM) application built to manage leads, track pipeline progress, and provide a secure, role-based dashboard for teams. 

## 🛠 Tech Stack

**Frontend:**
- **React.js** (built with Vite) for a fast, responsive user interface.
- **React Router** for protected, authentication-based route management.
- **@hello-pangea/dnd** to power the interactive Kanban-style pipeline boards.
- **Lucide React** for modern, crisp iconography.
- **Axios** for robust API communication.
- **Tailwind CSS / Vanilla CSS** for styling (depending on implementation details).

**Backend:**
- **Node.js & Express.js** structured using a scalable MVC (Model-View-Controller) architecture.
- **SQLite3** for lightweight, reliable database management.
- **JSON Web Tokens (JWT) & bcryptjs** for secure user authentication and route protection.
- **Multer, csv-parser, and json2csv** to enable automated CSV import and export of lead data.

## ✨ Key Features

- **Secure Authentication:** Robust login system with password hashing and JWT session management. Client-side route protection ensures only authorized users can access the dashboard.
- **Lead Management:** Create, read, update, and delete (CRUD) operations for customer leads.
- **Kanban Pipeline Board:** Interactive drag-and-drop interface to move leads through different stages of the sales pipeline.
- **Data Import/Export:** Seamlessly upload `.csv` files to import bulk leads or export current pipeline data to CSV for external reporting.
- **Modular Architecture:** Cleanly separated backend routes (`auth`, `dashboard`, `leads`) and structured frontend components for easy scaling and maintenance.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd CRM
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

**Start the Backend Server:**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Make sure you have a `.env` file set up (e.g., with a `JWT_SECRET`).
3. Start the Node.js server:
   ```bash
   node server.js
   ```
   *(Server typically runs on `http://localhost:5001`)*

**Start the Frontend Development Server:**
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start Vite:
   ```bash
   npm run dev
   ```
   *(Frontend typically runs on `http://localhost:5173`)*

## 📂 Project Structure

```
CRM/
├── backend/
│   ├── config/       # Database configuration (e.g., SQLite connection)
│   ├── controllers/  # Logic for handling API requests
│   ├── routes/       # API route definitions (auth, dashboard, leads)
│   ├── package.json  # Backend dependencies
│   └── server.js     # Entry point for the Express server
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route-level components (Dashboard, Login, etc.)
│   │   ├── App.jsx     # Main React application and routing logic
│   │   └── main.jsx    # React entry point
│   └── package.json    # Frontend dependencies and Vite scripts
│
└── README.md
```
