# CRM + HRM Backend API

Welcome to the CRM and HRM backend application! This documentation is designed to help new interns and developers quickly understand the codebase, set up the project locally, and start testing.

## 🚀 Tech Stack

- **Node.js & Express.js**: Core server framework.
- **MongoDB (Mongoose)**: NoSQL database for flexible schema management.
- **Redis & Bull**: Caching and background task queuing.
- **JWT (JSON Web Tokens)**: Authentication and authorization.
- **Swagger**: API Documentation.
- **Multer**: File uploads.
- **OpenAI & PDFKit**: Advanced features and PDF generation.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v16+)
- [MongoDB](https://www.mongodb.com/) (running locally or a cloud URI)
- [Redis](https://redis.io/) (Must be running locally on the default port `6379` for background jobs/caching)

## ⚙️ Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Ensure you have a `.env` file in the root directory. At a minimum, it should contain:
   ```env
   MONGO_URI="mongodb://localhost:27017/crm-hrm-DB"
   # Add other secrets here: JWT_SECRET, REDIS_URL, OPENAI_API_KEY, etc.
   ```

3. **Start the Server**
   ```bash
   # For development (auto-restarts on changes)
   npm run dev

   # For production
   npm start
   ```
   The server will typically start on `http://localhost:5000`.

## 📂 Project Structure

```text
src/
├── app.js               # Main Express app setup and middleware/route injection
├── server.js            # Server entry point (binds app to port)
├── config/              # Configuration files (Swagger, DB, etc.)
├── constants/           # App-wide constants
├── middleware/          # Global middlewares (Auth, Error handling)
├── modules/             # 🌟 Core Business Logic (Domain Driven Design)
│   ├── auth/            # Authentication (Login, Register)
│   ├── users/           # User Management
│   ├── dashboard/       # Dashboard analytics
│   ├── crm/             # CRM Modules (Leads, Customers, Deals, Activities, Reports)
│   ├── hrm/             # HRM Modules (Leaves, Attendance, Payroll, Performance, Onboarding...)
│   └── project/         # Project Management
├── jobs/                # Background Jobs (Bull queues)
├── utils/               # Helper functions
└── docs/                # Additional documentation
```

### Understanding the Modules
This project follows a **Feature-Based / Domain-Driven Architecture**. Inside `src/modules/`, each folder represents a specific feature (e.g., `auth`, `crm`, `hrm`). Inside each feature folder, you will typically find:
- `*.routes.js`: Defines the API endpoints.
- `*.controller.js`: Handles incoming requests and sends responses.
- `*.model.js` (or `models/`): Mongoose schemas.
- `*.service.js` (optional): Business logic separated from the controller.

## 🐛 Why is Swagger Not Working? (And How to Fix It)

**The Issue:**
You might notice that navigating to `http://localhost:5000/api-docs` only shows a couple of endpoints (like `/auth/login` and `/users`), even though there are dozens of routes in the code.
**Why:** Swagger *is* correctly configured in `src/config/swagger.js`. However, Swagger relies on special **JSDoc comments** placed directly inside your route files to generate the UI. Most of the route files (like `customerRoutes.js` and `project.routes.js`) are currently missing these comments.

**How to Fix It (For Interns):**
To make an endpoint appear in Swagger, you must add a YAML-like comment block directly above the route definition in the `*.routes.js` file.

*Example:* Open `src/modules/crm/routes/customerRoutes.js` and add this above the POST route:
```javascript
/**
 * @swagger
 * /api/crm/customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Customer created successfully
 */
router.post("/", protect, authorizeRoles("ADMIN", "MANAGER", "BD"), createCustomer);
```
Once you add these comments, restart the server, and the endpoints will magically appear in `/api-docs`!

## 🧪 Testing Guide for Interns

1. **Health Check**: Send a GET request to `http://localhost:5000/health` to verify the server is running.
2. **Authentication**: 
   - Use the `/api/auth/login` endpoint via Postman or Swagger to get a JWT Token.
   - For all protected routes, include the token in the headers: `Authorization: Bearer <your_token_here>`.
3. **API Client**: We recommend using [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) (VS Code Extension) to test APIs iteratively while you are adding the missing Swagger documentation.
4. **Roles & Permissions**: Note the `authorizeRoles("HR", "MANAGER", "ADMIN")` middleware on routes. Ensure your test user has the appropriate role in the database to access those endpoints!