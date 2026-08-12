# Use an official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including firebase-admin and data connect SDK)
RUN npm install --production

# Copy the rest of the backend code including src/dataconnect-admin-generated and config/serviceAccountKey.json
COPY . .

# Expose the port the app runs on
EXPOSE 5001

# Command to run the application
CMD ["node", "server.js"]
