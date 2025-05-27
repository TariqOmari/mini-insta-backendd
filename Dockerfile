# Use Alpine base
FROM node:18-alpine

# Install required build tools (optional - only if needed)
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose your app's port
EXPOSE 5000

# Start your server
CMD ["node", "server.js"]
