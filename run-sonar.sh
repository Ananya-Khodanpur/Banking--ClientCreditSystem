#!/bin/bash

echo "🔍 Running SonarQube Code Quality Analysis"
echo "=========================================="

# Navigate to project root
cd "$(dirname "$0")"

# Check if SonarQube is running
echo "📡 Checking SonarQube connection..."
if curl -s http://localhost:9000 > /dev/null; then
    echo "✅ SonarQube is running"
else
    echo "❌ SonarQube is not ready yet. Please wait a moment and try again."
    echo "💡 You can access SonarQube at: http://localhost:9000"
    echo "🔑 Default login: admin / admin"
    exit 1
fi

# Frontend Analysis
echo "🌐 Analyzing Frontend (React/TypeScript)..."
cd corpbank-ui

# Generate coverage report if it doesn't exist
if [ ! -f "coverage/lcov.info" ]; then
    echo "📊 Generating coverage report..."
    npm run test:coverage -- --reporter=lcov --outputFile=coverage/lcov.info
fi

# Run SonarQube analysis for frontend
echo "🔬 Running SonarQube scanner for frontend..."
sonar-scanner \
    -Dsonar.projectKey=corporate-banking-frontend \
    -Dsonar.projectName="Corporate Banking Frontend" \
    -Dsonar.sources=src \
    -Dsonar.tests=src/test \
    -Dsonar.test.inclusions=**/*.test.ts,**/*.test.tsx \
    -Dsonar.exclusions=node_modules/**,coverage/**,dist/**,build/** \
    -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
    -Dsonar.host.url=http://localhost:9000 \
    -Dsonar.login=admin \
    -Dsonar.password=admin123

cd ..

# Backend Analysis
echo "☕ Analyzing Backend (Spring Boot/Java)..."
cd corporate-banking-backend

# Run tests and generate coverage
echo "🧪 Running backend tests..."
./mvnw clean test jacoco:report

# Run SonarQube analysis for backend
echo "🔬 Running SonarQube scanner for backend..."
./mvnw sonar:sonar \
    -Dsonar.projectKey=corporate-banking-backend \
    -Dsonar.projectName="Corporate Banking Backend" \
    -Dsonar.host.url=http://localhost:9000 \
    -Dsonar.login=admin \
    -Dsonar.password=admin123

cd ..

echo ""
echo "🎉 SonarQube Analysis Complete!"
echo "================================"
echo "🌐 Access SonarQube Dashboard: http://localhost:9000"
echo "🔑 Login: admin / admin123"
echo ""
echo "📊 You'll see two projects:"
echo "   • Corporate Banking Frontend"
echo "   • Corporate Banking Backend"
echo ""
echo "🎯 Check for:"
echo "   • Code coverage percentage"
echo "   • Code smells and bugs"
echo "   • Security vulnerabilities"
echo "   • Maintainability rating"
