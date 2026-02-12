# Task Manager

A MERN stack task and team management application with role-based access control.


## Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB Atlas account** or local MongoDB


## Project Setup

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file with the following:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development

# Start backend server
npm run dev
```

### 2. Frontend Setup

```bash
# Open new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend server
npm run dev
```

## Running the Application

The application requires both servers running:

- **Backend:** `http://localhost:5000`
- **Frontend:** `http://localhost:3000`

### Quick Start (Windows)

Run both servers at once:

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## First-Time Usage

1. Open `http://localhost:3000`
2. Register an admin account (only one admin allowed)
3. Login and start managing tasks and teams

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, JWT
- **Frontend:** React, Tailwind CSS, Axios

## License

ISC License
