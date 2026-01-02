# 🚀 Complete Setup Guide for Freshers

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] **Node.js 18+** - [Download here](https://nodejs.org/)
- [ ] **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- [ ] **Git** - [Download here](https://git-scm.com/)
- [ ] **VS Code** (Recommended) - [Download here](https://code.visualstudio.com/)

## 🐳 Docker Setup (Easiest Method)

### Step 1: Start All Services
```bash
# Clone the repository
git clone <repository-url>
cd capstoneProject

# Start everything with one command!
docker-compose up --build
```

### Step 2: Wait for Services to Start
⏱️ **This will take 5-10 minutes on first run**

You'll see logs like:
```
mongo      | MongoDB starting...
backend    | Spring Boot application starting...
frontend   | Nginx starting...
sonarqube   | SonarQube starting...
```

### Step 3: Access Applications
- **🌐 Frontend**: http://localhost:80
- **🔧 Backend API**: http://localhost:8080
- **🔍 SonarQube**: http://localhost:9000
- **🗄️ MongoDB**: localhost:27017

## 🧪 Testing Setup

### Frontend Tests
```bash
# Navigate to frontend directory
cd corpbank-ui

# Install dependencies (includes testing libraries)
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with visual interface
npm run test:ui
```

### Backend Tests
```bash
# Navigate to backend directory
cd corporate-banking-backend

# Run all tests
./mvnw test

# Generate coverage report
./mvnw jacoco:report
```

## 🔍 SonarQube Code Quality Setup

### Step 1: Access SonarQube
1. Open http://localhost:9000
2. Login with: `admin` / `admin`
3. Complete initial setup

### Step 2: Create Project
1. Click "Create new project"
2. Enter project key: `corporate-banking`
3. Choose "With GitHub Actions" or "From CLI"

### Step 3: Run Analysis
```bash
# For Frontend
cd corpbank-ui
npm run test:coverage

# For Backend
cd corporate-banking-backend
./mvnw clean verify sonar:sonar \
  -Dsonar.projectKey=corporate-banking \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=your-token
```

## 📱 Development Mode (For Making Changes)

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

## 🔑 Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| 👑 Admin | admin | admin123 |
| 💼 RM | newrm | rm123 |
| 📊 Analyst | newanalyst | analyst123 |

## 🚨 Troubleshooting Guide

### Docker Issues
```bash
# If containers don't start
docker-compose down
docker system prune -a
docker-compose up --build

# Check container status
docker-compose ps

# View logs
docker-compose logs [service-name]
```

### Frontend Issues
```bash
# Clear everything and reinstall
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

### Port Conflicts
If you see "port already in use" errors:
```bash
# Find what's using the port
netstat -tulpn | grep :8080

# Kill the process
sudo kill -9 <PID>
```

## 📊 Understanding the Project Structure

### Frontend (React + TypeScript)
```
corpbank-ui/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main dashboard pages
│   ├── features/       # Feature-specific code
│   ├── auth/           # Login and signup
│   ├── store/          # Redux state management
│   └── test/           # Test files
├── public/             # Static assets
└── package.json        # Dependencies
```

### Backend (Spring Boot + Java)
```
corporate-banking-backend/
├── src/main/java/com/
│   ├── controller/     # API endpoints
│   ├── service/        # Business logic
│   ├── repository/     # Database operations
│   ├── security/       # Authentication
│   ├── dto/            # Data transfer objects
│   └── bean/           # Database entities
├── src/test/           # Test files
└── pom.xml             # Maven configuration
```

## 🧪 Testing for Freshers

### What is Testing?
Testing ensures your code works as expected. We use:
- **Unit Tests**: Test individual functions/components
- **Integration Tests**: Test how parts work together
- **Coverage**: Measures how much code is tested

### Running Tests
```bash
# Frontend tests
cd corpbank-ui
npm test                    # Run all tests
npm run test:coverage      # Run with coverage report
npm run test:ui           # Visual test interface

# Backend tests
cd corporate-banking-backend
./mvnw test                # Run all tests
./mvnw jacoco:report       # Generate coverage report
```

### Understanding Test Results
- **✅ Passed**: Test worked correctly
- **❌ Failed**: Test found an issue
- **📊 Coverage %**: How much code is tested
- **🎯 Goal**: 80%+ coverage

## 🔍 Code Quality with SonarQube

### What is SonarQube?
SonarQube analyzes your code for:
- **Bugs**: Potential errors
- **Code Smells**: Poor coding practices
- **Security Issues**: Vulnerabilities
- **Coverage**: Test coverage analysis

### Quality Gates
Your code must pass these checks:
- ✅ **Coverage**: > 80% of code tested
- ✅ **Reliability**: No critical bugs
- ✅ **Security**: No security hotspots
- ✅ **Maintainability**: Easy to understand code

### Fixing Issues
1. **Check SonarQube Dashboard**: http://localhost:9000
2. **Review Issues**: Click on each problem
3. **Fix Code**: Update your source code
4. **Re-run Analysis**: See improvements

## 🎯 Learning Path for Freshers

### Week 1: Understanding the Basics
- [ ] **React Basics**: Components, props, state
- [ ] **TypeScript**: Types and interfaces
- [ ] **Spring Boot**: Controllers and services
- [ ] **MongoDB**: Basic database concepts

### Week 2: Authentication & Security
- [ ] **JWT Tokens**: How authentication works
- [ ] **Spring Security**: Backend security
- [ ] **Role-based Access**: Different user permissions
- [ ] **Redux State Management**: Frontend state

### Week 3: Testing & Quality
- [ ] **Writing Tests**: Unit and integration tests
- [ ] **Test Coverage**: Measuring test effectiveness
- [ ] **SonarQube**: Code quality analysis
- [ ] **CI/CD Basics**: Automated testing

### Week 4: Advanced Topics
- [ ] **Docker**: Containerization
- [ ] **API Design**: RESTful principles
- [ ] **Error Handling**: Proper error management
- [ ] **Performance**: Optimization techniques

## 📞 Getting Help

### Common Issues
1. **"Port already in use"**: Kill processes using ports
2. **"Module not found"**: Run `npm install`
3. **"Docker build failed"**: Check Docker logs
4. **"Tests failing"**: Check test setup and mocks

### Debugging Tips
- **Browser Console**: F12 → Console tab
- **Network Tab**: Check API calls
- **Docker Logs**: `docker-compose logs`
- **Backend Logs**: Spring Boot console output

### Resources
- **React Documentation**: https://react.dev/
- **Spring Boot Guide**: https://spring.io/guides/
- **Docker Tutorial**: https://docs.docker.com/get-started/
- **SonarQube Docs**: https://docs.sonarqube.org/

---

## 🎉 Congratulations! 

You now have a complete understanding of:
✅ **Modern Web Development**  
✅ **Containerized Deployment**  
✅ **Testing & Quality Assurance**  
✅ **Professional Development Practices**  

This project demonstrates exactly what companies expect from fresh graduates in 2024! 

**Happy Coding! 💻**  
*Keep learning and building amazing projects!* 🚀
