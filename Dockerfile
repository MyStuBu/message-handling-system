# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Runtime Stage
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=build /app ./

# Custom Entrypoint Script
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh