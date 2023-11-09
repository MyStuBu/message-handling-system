# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the local requirements file to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local application code to the container
COPY ./src /app/src

# Command to run the application
CMD ["npm", "run", "start"]