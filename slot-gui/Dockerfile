# Use the official Bun image
FROM oven/bun:1.2.12

# Set working directory inside the container
WORKDIR /app

# Copy all files from your project directory into the container
COPY . .

# Install dependencies
RUN bun install --frozen-lockfile

# Build your frontend (assuming "build" script is in package.json)
RUN bun run build

# Expose the app port (adjust if needed)
EXPOSE 9090

# Start the server (Bun runs TypeScript directly)
CMD ["bun", "run", "server.ts"]

