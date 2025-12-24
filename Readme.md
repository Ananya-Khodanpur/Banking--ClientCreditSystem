🏦 Corporate Banking Credit Management System

A full-stack corporate banking application that enables relationship managers (RM) and admins to manage clients, credit requests, approvals, and documentation securely using JWT authentication.
The application follows a modern SPA + REST architecture and is fully Dockerized.

📌 Features
🔐 Authentication & Authorization

JWT-based authentication

Role-based access control (ADMIN, RM)

Secure API access using Spring Security

👥 Client Management

Create and manage corporate client profiles

View complete client details including:

Company information

Primary contact

Annual turnover

Document submission status

Assigned RM

💳 Credit Request Management

Create credit requests for clients

Track credit request status (PENDING / APPROVED / REJECTED)

Admin approval workflow

🖥️ Frontend

Single Page Application (SPA)

Protected routes

Redux Toolkit for state management

Material UI components

🐳 Deployment

Dockerized frontend, backend, and MongoDB

docker-compose for local orchestration

Nginx serving optimized React build

🧱 Architecture
┌──────────────┐     HTTP (REST)     ┌──────────────┐
│   React SPA  │ ─────────────────▶ │ Spring Boot  │
│  (Frontend)  │                    │   Backend    │
└──────────────┘                    └──────────────┘
        │                                   │
        │ JWT                               │
        ▼                                   ▼
┌──────────────────┐             ┌──────────────────┐
│   Browser        │             │    MongoDB        │
│ (LocalStorage)  │             │   (NoSQL DB)      │
└──────────────────┘             └──────────────────┘

🛠️ Tech Stack
Frontend

React (Vite)

React Router DOM

Redux Toolkit

Axios

Material UI

Backend

Spring Boot

Spring Security

JWT Authentication

MongoDB (Spring Data)

DevOps

Docker

Docker Compose

Nginx

📁 Project Structure
Frontend (corpbank-ui)
src/
│── api/
│   └── axios.ts
│── auth/
│   └── Login.tsx
│── components/
│   └── PrivateRoute.tsx
│── features/
│   ├── clients/
│   │   ├── clientSlice.ts
│   │   └── clientList.tsx
│   ├── credit/
│   │   ├── creditSlice.ts
│   │   └── creditRequestList.tsx
│── store/
│   └── store.ts
│── hooks.ts
│── App.tsx
│── main.tsx

Backend (corpbank-api)
src/main/java/
│── config/
│── controller/
│── dto/
│── entity/
│── repository/
│── security/
│── service/

🔑 Authentication Flow

User logs in with username & password

Backend validates credentials

JWT token is returned

Token stored in localStorage

Axios interceptor attaches JWT to every request

Protected routes verify authentication

🔐 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/login	Login & get JWT
Clients
Method	Endpoint	Role
GET	/api/clients	RM
GET	/api/clients/{id}	RM
POST	/api/clients	ADMIN
Credit Requests
Method	Endpoint	Role
POST	/api/credit-requests	RM
GET	/api/credit-requests	ADMIN
PUT	/api/credit-requests/{id}/approve	ADMIN
⚙️ Environment Variables
Backend
SPRING_DATA_MONGODB_URI=mongodb://mongo:27017/dbName
JWT_SECRET=your_secret_key

Frontend
VITE_API_URL=http://localhost:8080

🐳 Docker Setup
Run Entire Stack
docker-compose up --build

Services

Frontend → http://localhost:5173

Backend → http://localhost:8080

MongoDB → port 27017

🧪 Sample Credentials
ADMIN
username: admin
password: admin123

RM
username: rm1
password: rm123

🚦 Route Access
Route	Role
/login	Public
/clients	RM
/credit-requests	ADMIN


🚀 Future Enhancements

Document upload (PDF/KYC)

Pagination & search

Audit logs

Email notifications

Refresh token support

👩‍💻 Author

Ananya K
Capstone Project – Corporate Banking System

📄 License

This project is for educational purposes only.