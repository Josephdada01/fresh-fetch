# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Define the environment variable correctly
ENV PATH /app/node_modules/.bin:$PATH

# Build the application
RUN npm run build

# Use an official nginx image as the base image for serving the build
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]

