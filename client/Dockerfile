# Stage 1: Build the frontend with Node
FROM node:21-alpine as build

WORKDIR /usr/src/app

# Install React 19 and other dependencies
COPY package*.json ./

COPY .env .env

RUN npm install -f

# Copy the rest of the frontend code
COPY . .

# Build the frontend
RUN npm run build

# Stage 2: Serve the frontend with Nginx
FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
