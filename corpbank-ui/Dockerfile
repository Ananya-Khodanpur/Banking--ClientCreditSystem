# # Stage 1: Build frontend
# FROM node:20-bullseye AS build
# WORKDIR /app

# # Copy package files first to leverage caching
# COPY package*.json ./

# # Clean install dependencies (fixes rollup native module issue)
# RUN rm -rf node_modules package-lock.json \
#     && npm install --legacy-peer-deps

# # Copy source code
# COPY . .

# # Build frontend
# RUN npm run build

# # Stage 2: Serve with Nginx
# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
