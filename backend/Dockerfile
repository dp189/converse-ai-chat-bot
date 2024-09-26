# Stage 1: Build the backend
FROM node:21-alpine as build

WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the application code
COPY . .

# Expose backend on port 3000
EXPOSE 3000

# Start backend
CMD ["npm", "run", "dev"]
