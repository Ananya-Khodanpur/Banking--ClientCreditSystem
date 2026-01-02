🏦 Corporate Banking Credit Management System

A modern, full-stack corporate banking application built with React, Spring Boot, and MongoDB. This project is designed to help freshers understand enterprise-level web development with proper authentication, role-based access control, and professional deployment practices.

## 🎯 Perfect for Freshers!

This project demonstrates:
- **Modern Web Development**: React + TypeScript + Spring Boot
- **Authentication & Security**: JWT tokens and role-based access
- **Database Integration**: MongoDB with Spring Data
- **Professional UI**: Material-UI with responsive design
- **DevOps Practices**: Docker containerization and deployment
- **Code Quality**: Testing and SonarQube integration

## 🚀 Quick Start for Freshers

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Docker** and **Docker Compose** - [Download here](https://www.docker.com/)
- **Git** - [Download here](https://git-scm.com/)

### Step 1: Clone and Start
```bash
# Clone the repository
git clone <repository-url>
cd capstoneProject

# Start everything with one command!
docker-compose up --build
```

### Step 2: Access the Application
- **🌐 Frontend**: http://localhost:80
- **🔧 Backend API**: http://localhost:8080
- **🔍 Code Quality**: http://localhost:9000 (SonarQube)

### Step 3: Login with Default Credentials
```
👑 Admin User:
Username: admin
Password: admin123

💼 RM User:
Username: newrm
Password: rm123

📊 Analyst User:
Username: newanalyst
Password: analyst123
```

## 📋 Features Overview

### 🔐 Authentication & Authorization
- **JWT-based Authentication**: Secure token-based login system
- **Role-based Access Control**: Different permissions for Admin, RM, Analyst
- **Single Sign-On**: Login once and access all dashboards
- **Session Management**: Automatic token handling

### 👥 User Roles & Permissions

#### 👑 Admin
- ✅ Create and manage users
- ✅ View system statistics
- ✅ Access all dashboards
- ✅ User status management

#### 💼 Relationship Manager (RM)
- ✅ Create and manage clients
- ✅ Create credit requests
- ✅ View client portfolio
- ✅ Track request status

#### 📊 Analyst
- ✅ Review credit requests
- ✅ Approve/reject requests
- ✅ Add review remarks
- ✅ View request statistics

### 🖥️ Modern UI Features
- **Professional Design**: Material-UI components with custom styling
- **Responsive Layout**: Works on desktop and mobile devices
- **Real-time Statistics**: Live data updates on dashboards
- **Interactive Navigation**: Sidebar with cross-role access
- **Smooth Animations**: Modern transitions and hover effects

## 📁 Project Structure (Easy to Understand!)

```
capstoneProject/
├── 📁 corpbank-ui/                 # Frontend React Application
│   ├── src/
│   │   ├── 📁 components/          # Reusable UI components
│   │   │   ├── DashboardLayout.tsx # Main layout wrapper
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   └── PrivateRoute.tsx     # Authentication wrapper
│   │   ├── 📁 pages/              # Dashboard pages for each role
│   │   │   ├── AdminDashboard.tsx   # Admin main page
│   │   │   ├── RMDashboard.tsx      # RM main page
│   │   │   └── AnalystDashboard.tsx # Analyst main page
│   │   ├── 📁 features/           # Feature-specific components
│   │   │   ├── admin/              # Admin features
│   │   │   ├── clients/            # Client management
│   │   │   └── credit/             # Credit request management
│   │   ├── 📁 auth/               # Authentication components
│   │   │   ├── Login.tsx           # Login page
│   │   │   └── Signup.tsx          # User creation
│   │   ├── 📁 store/              # Redux state management
│   │   └── 📁 api/                # API configuration
│   ├── 📁 public/                  # Static assets
│   ├── 🐳 Dockerfile              # Frontend Docker setup
│   └── 📦 package.json            # Frontend dependencies
│
├── 📁 corporate-banking-backend/   # Backend Spring Boot Application
│   ├── src/
│   │   └── main/java/com/          # Java source code
│   │       ├── 📁 controller/     # REST API endpoints
│   │       ├── 📁 service/        # Business logic
│   │       ├── 📁 repository/     # Database operations
│   │       ├── 📁 security/       # Security configuration
│   │       ├── 📁 dto/            # Data transfer objects
│   │       └── 📁 bean/           # Database entities
│   ├── 🐳 Dockerfile              # Backend Docker setup
│   └── 📦 pom.xml                 # Maven configuration
│
├── 🐳 docker-compose.yml           # Multi-container setup
└── 📖 Readme.md                   # This documentation
```

## 🛠️ Technology Stack

### Frontend (React Ecosystem)
- **React 19**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Material-UI**: Professional UI components
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Vite**: Fast build tool

### Backend (Java Spring Ecosystem)
- **Spring Boot**: Java application framework
- **Spring Security**: Authentication and authorization
- **Spring Data MongoDB**: Database integration
- **JWT**: Token-based authentication
- **Maven**: Build and dependency management

### Database & DevOps
- **MongoDB**: NoSQL database
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Web server for frontend
- **SonarQube**: Code quality analysis

## 🧪 Testing for Freshers

### Frontend Testing
```bash
# Navigate to frontend
cd corpbank-ui

# Install testing dependencies
npm install

# Run tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests with visual interface
npm run test:ui
```

### Backend Testing
```bash
# Navigate to backend
cd corporate-banking-backend

# Run all tests
./mvnw test

# Generate test coverage report
./mvnw jacoco:report
```

## 🔑 Important API Endpoints

### Authentication
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Admin Operations
```http
GET /api/admin/users           # Get all users
POST /api/admin/register       # Create new user
PUT /api/admin/users/{id}/status # Update user status
```

### RM Operations
```http
GET /api/clients              # Get all clients
POST /api/rm/clients          # Create new client
GET /api/credit-requests      # Get credit requests
POST /api/credit-requests     # Create credit request
```

### Analyst Operations
```http
GET /api/credit-requests      # Get all requests
PUT /api/credit-requests/{id} # Update request status
```

## 🐳 Docker Services Explained

The application runs in multiple containers:

| Service | Port | Purpose |
|---------|------|---------|
| **MongoDB** | 27017 | Database storage |
| **Backend** | 8080 | Spring Boot API |
| **Frontend** | 80 | React application |
| **SonarQube** | 9000 | Code quality analysis |
| **PostgreSQL** | 5432 | SonarQube database |

## 🔍 Code Quality with SonarQube

1. **Access SonarQube**: http://localhost:9000
2. **Login**: admin/admin (first time setup)
3. **Create Project**: Follow the setup wizard
4. **Run Analysis**: Use the provided command
5. **View Results**: Check code quality metrics

### Quality Gates
- **Coverage**: Minimum 80% test coverage
- **Maintainability**: Code should be easy to understand
- **Security**: No critical security issues
- **Reliability**: Code should work as expected

## 🚨 Common Issues & Solutions

### Docker Issues
```bash
# Clean everything and restart
docker-compose down
docker system prune -a
docker-compose up --build
```

### Frontend Issues
```bash
# Clear and reinstall dependencies
cd corpbank-ui
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend Issues
```bash
# Clean and rebuild
cd corporate-banking-backend
./mvnw clean
./mvnw spring-boot:run
```

## 📚 Learning Path for Freshers

### 1. Understanding the Basics
- **React Basics**: Components, props, state, hooks
- **TypeScript**: Types, interfaces, generics
- **Spring Boot**: Controllers, services, repositories
- **MongoDB**: NoSQL concepts, documents, collections

### 2. Authentication Flow
1. User enters credentials
2. Backend validates and returns JWT token
3. Frontend stores token in localStorage
4. Every API request includes the token
5. Backend verifies token for protected routes

### 3. Role-Based Access
- **Admin**: Can access everything
- **RM**: Can manage clients and requests
- **Analyst**: Can only review requests
- **Implementation**: Spring Security + JWT

### 4. State Management
- **Redux Store**: Global application state
- **Slices**: Feature-specific state management
- **Actions**: State update operations
- **Selectors**: Accessing state from components

## 🎯 Best Practices Demonstrated

### Code Organization
- **Clean Architecture**: Separation of concerns
- **Component Reusability**: Shared UI components
- **API Layer**: Centralized API configuration
- **Error Handling**: Proper error management

### Security
- **JWT Authentication**: Secure token-based auth
- **Role-based Authorization**: Proper access control
- **Input Validation**: Form validation and sanitization
- **Secure Storage**: Proper token handling

### Performance
- **Lazy Loading**: Load components when needed
- **Optimization**: Efficient re-renders
- **Caching**: API response caching
- **Bundle Optimization**: Small bundle sizes

## 🚀 Development Mode

### Frontend Development
```bash
cd corpbank-ui
npm install
npm run dev
# Visit: http://localhost:5173
```

### Backend Development
```bash
cd corporate-banking-backend
./mvnw spring-boot:run
# API available at: http://localhost:8080
```

## 📊 Project Statistics

- **Lines of Code**: ~5,000+ lines
- **Test Coverage**: 80%+ target
- **Components**: 20+ React components
- **API Endpoints**: 10+ REST endpoints
- **Docker Containers**: 5 services

## 🤝 Contributing for Freshers

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

## 📞 Help & Support

### Getting Help
1. **Check logs**: `docker-compose logs [service-name]`
2. **Browser Console**: Check for frontend errors
3. **Network Tab**: Verify API calls
4. **Backend Logs**: Check Spring Boot console

### Common Questions
- **Q**: Why Docker?  
  **A**: Ensures consistent environment across machines
- **Q**: Why Redux?  
  **A**: Manages global state and authentication
- **Q**: Why MongoDB?  
  **A**: Flexible schema for banking data
- **Q**: Why TypeScript?  
  **A**: Type safety and better developer experience

---

## 🎉 Congratulations!

You've just explored a professional-grade full-stack application! This project demonstrates:

✅ **Modern Development Practices**  
✅ **Enterprise Security**  
✅ **Professional UI/UX**  
✅ **Containerized Deployment**  
✅ **Code Quality Standards**  
✅ **Comprehensive Testing**  

This is exactly what companies expect from fresh graduates in 2024! Keep learning and building amazing projects! 🚀

---

**Happy Coding! 💻**  
*Built with ❤️ for the developer community*