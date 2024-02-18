# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install curl
RUN apk update && apk add --no-cache curl


# Set the working directory in the container
WORKDIR /users-service

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY .  .

EXPOSE 3000

# Start the server
CMD ["npm", "run","start:dev"]