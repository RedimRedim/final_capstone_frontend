# Use an official Node.js image as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend (if applicable, e.g., for React)
RUN npm run build

# Build the project for production (using webpack.prod.js)
RUN npm run build

# Expose the port the app will run on
EXPOSE 8080

# Run the 'npm run serve' command to serve the production build
CMD ["npm", "run", "serve"]