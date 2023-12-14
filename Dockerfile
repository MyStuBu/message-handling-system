# Stage 1: Base image for installing dependencies
FROM node:20.10.0-alpine3.18 AS base
WORKDIR /usr/src/
COPY package*.json ./
RUN npm install

# Stage 2: Transpile stage
FROM base as production-transpile
COPY ./src/ ./src/
COPY tsconfig.json .
RUN npx tsc -p ./tsconfig.json

# Stage 3: Production stage
FROM node:20.10.0-alpine3.18 AS production
WORKDIR /usr/src/app

# Create the sqlite directory with correct permissions
RUN mkdir /usr/src/app/sqlite && chown -R node:node /usr/src/app/sqlite

# Copy transpiled code from the production-transpile stage
COPY --from=production-transpile /usr/src/dist/ ./app/

# Set environment variables
ENV NODE_ENV production

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Switch to a non-root user
USER node