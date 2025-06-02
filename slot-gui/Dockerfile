# Use the latest Node LTS image for maximum compatibility
FROM node:20

WORKDIR /app

# Copy everything in (since it's all needed for the build and runtime)
COPY . .

# Install dependencies
RUN npm install

# Build your app (adjust if your build command is different)
RUN npm run build

# Expose the correct port (adjust if different)
EXPOSE 8080

# Start your server
CMD ["node", "server.js"]

