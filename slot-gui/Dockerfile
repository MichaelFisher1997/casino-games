# Use the official Bun image
FROM oven/bun:1.1

WORKDIR /app

# Copy everything
COPY . .

# Install deps with bun
RUN bun install

# Build your static files (if needed)
RUN bun run build

# Expose port (adjust if needed)
EXPOSE 3000

# If you want to serve static files with bun's HTTP, use your own server.js/server.ts.
CMD ["bun", "run", "start"]

