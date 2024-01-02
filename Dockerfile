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
WORKDIR /usr/src/

# Create the sqlite directory with correct permissions
RUN mkdir /usr/src/sqlite && chown -R node:node /usr/src/sqlite

# Copy transpiled code from the production-transpile stage
COPY --from=production-transpile /usr/src/dist/ ./app/

# Set environment variables
ENV NODE_ENV=production \
    PORT=80

# Install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Switch to a non-root user
USER node

EXPOSE 80

CMD ["node", "app/App.js"]