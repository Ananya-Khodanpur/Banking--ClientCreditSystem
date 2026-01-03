# Stage 1: Build frontend
FROM node:20-bullseye AS build
WORKDIR /app

# Copy package files first to leverage caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code (excluding tests for build)
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./

# Fix Rollup issue by clearing cache and reinstalling
RUN rm -rf node_modules package-lock.json && npm install --legacy-peer-deps

# Build frontend
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Create nginx.conf for proper routing
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api { \
        proxy_pass http://backend:8080; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
