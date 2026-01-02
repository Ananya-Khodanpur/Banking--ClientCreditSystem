# 🚀 Corporate Banking System - Quick Start Guide

## 📋 What You Get
- **Frontend**: React app with Material-UI (Port 80)
- **Backend**: Spring Boot API (Port 8080)  
- **Database**: MongoDB (Port 27017)
- **Code Quality**: SonarQube (Port 9000)

## 🎯 One Command Start
```bash
docker-compose up --build
```

## ⏱️ Wait Times
- **First build**: 5-10 minutes (downloads & builds everything)
- **Subsequent starts**: 1-2 minutes (uses cached images)

## 🌐 Access Points
Once running, visit:
- **Main App**: http://localhost:80
- **API**: http://localhost:8080
- **SonarQube**: http://localhost:9000 (login: admin/admin)

## 🔑 Default Users
- **Admin**: username: `admin`, password: `admin123`
- **Relationship Manager**: username: `newrm`, password: `rm123`
- **Analyst**: username: `newanalyst`, password: `analyst123`

## 🛑 To Stop
```bash
docker-compose down
```

## 🧪 To Run Tests
```bash
cd corpbank-ui
npm test
```

## 📊 Code Quality Analysis
1. Visit http://localhost:9000
2. Login with admin/admin
3. Create new project
4. Upload your code

## 🔧 Troubleshooting
- **Port conflicts**: Make sure ports 80, 8080, 27017, 9000 are free
- **Build fails**: Run `docker-compose down` then try again
- **Slow startup**: First time is slow, subsequent starts are faster

## 🎓 Perfect for Freshers!
This setup demonstrates:
- Docker containerization
- Microservices architecture
- React + Spring Boot integration
- Code quality analysis
- Professional development workflow

**That's it! Your entire corporate banking system runs with ONE command!** 🚀
