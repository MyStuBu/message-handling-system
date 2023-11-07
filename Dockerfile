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

# Expose port 3000 to allow communication (change this port if your application uses a different one)
EXPOSE 3000

# Command to run the application
CMD ["node", "src/app.js"]