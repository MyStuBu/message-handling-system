# Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Transpile Stage
FROM node:20-alpine AS transpile
WORKDIR /app
COPY --from=build /app ./
RUN npx tsc -p ./tsconfig.json

# Runtime Stage
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=transpile /app ./

# Custom Entrypoint Script
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh