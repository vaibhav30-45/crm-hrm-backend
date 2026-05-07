# CRM + HRM Frontend Application

Welcome to the frontend application for the CRM & HRM system! This is a modern, fast, and responsive user interface built using Vite and React.

## 🚀 Tech Stack

- **React (v19)**: The core UI library.
- **Vite**: Ultra-fast frontend build tool and development server.
- **React Router DOM**: Client-side routing for navigating between dashboards and modules.
- **Chart.js & Recharts**: Libraries used for rendering beautiful data visualizations and analytics on the dashboards.
- **React Icons**: For standardizing UI icons.

## ⚙️ How to Start the Frontend

Follow these simple steps to run the frontend application locally:

1. **Navigate to the frontend directory** (if you aren't already there):
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **View the App**:
   Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

## 📁 Project Structure

```text
frontend/
├── index.html           # Main HTML template
├── vite.config.js       # Vite configuration file
├── package.json         # Dependencies and scripts
├── public/              # Static assets (images, favicons)
└── src/                 # Application Source Code
    ├── components/      # Reusable UI components (buttons, modals, charts)
    ├── pages/           # Page-level components (Dashboards, Login, etc.)
    ├── context/         # React Context for state management (Auth, Theme)
    ├── hooks/           # Custom React hooks
    ├── services/        # API call wrappers (Axios configurations)
    └── App.jsx          # Main application component & routing
```

## 🔗 Connecting to the Backend

By default, the frontend is expected to communicate with the backend API running on `http://localhost:5000/api`.
Ensure that:
1. The backend server is running simultaneously in another terminal.
2. If your backend is running on a different port, update the base URL in your frontend API service configurations or `.env` file (if applicable).

## 🧹 Linting & Code Quality

To keep the codebase clean and adhere to best practices, you can run the linter:
```bash
npm run lint
```

## 🏗️ Building for Production

When you are ready to deploy, create an optimized production build:
```bash
npm run build
```
You can then preview the production build locally using:
```bash
npm run preview
```
