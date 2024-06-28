# Stage 1: Build Stage
FROM node:18 AS build
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the React app
RUN npm run build
# Stage 2: Serve the app with nginx
FROM nginx:alpine
# Copy the built React app from the previous stage to the nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html
# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]