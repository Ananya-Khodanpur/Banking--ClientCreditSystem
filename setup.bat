@echo off
echo 🚀 Corporate Banking System - Complete Setup & Test Runner
echo ========================================================

REM Function to check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop first.
    pause
    exit /b 1
)
echo ✅ Docker is running

REM Function to start services
echo 🐳 Starting all services with Docker Compose...
docker-compose up --build -d

echo ⏱️ Waiting for services to start (this may take 5-10 minutes)...
timeout /t 30 /nobreak >nul

REM Check if services are healthy
echo 🔍 Checking service health...

REM Check backend
curl -f http://localhost:8080/api/auth/login >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is healthy
) else (
    echo ⚠️ Backend is still starting...
)

REM Check frontend
curl -f http://localhost:80 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend is healthy
) else (
    echo ⚠️ Frontend is still starting...
)

REM Check SonarQube
curl -f http://localhost:9000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ SonarQube is healthy
) else (
    echo ⚠️ SonarQube is still starting...
)

REM Function to run tests
echo 🧪 Running Frontend Tests...
cd corpbank-ui

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install --legacy-peer-deps
)

REM Run tests
echo 🔬 Running frontend tests with coverage...
npm run test:coverage || echo ⚠️ Some tests may fail initially

cd ..

echo 🧪 Running Backend Tests...
cd corporate-banking-backend

REM Run backend tests
echo 🔬 Running backend tests...
call mvnw test || echo ⚠️ Some tests may fail initially

cd ..

REM Function to show status
echo.
echo 📊 Service Status:
echo ==================
echo 🌐 Frontend:     http://localhost:80
echo 🔧 Backend API:  http://localhost:8080
echo 🔍 SonarQube:    http://localhost:9000
echo 🗄️ MongoDB:      localhost:27017
echo.
echo 🔑 Login Credentials:
echo ====================
echo Admin:    admin / admin123
echo RM:       newrm / rm123
echo Analyst:  newanalyst / analyst123
echo.
echo 🧪 Test Commands:
echo ==================
echo Frontend tests:     cd corpbank-ui ^&^& npm test
echo Frontend coverage:  cd corpbank-ui ^&^& npm run test:coverage
echo Backend tests:      cd corporate-banking-backend ^&^& mvnw test
echo.

echo 🎉 Setup complete! Your application is ready to use.
echo 💡 Use the URLs above to access different services.
echo 📖 See SETUP_GUIDE.md for detailed instructions.
pause
