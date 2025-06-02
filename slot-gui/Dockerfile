# Use Bun's official image
FROM oven/bun:1.1

WORKDIR /app

# Copy everything
COPY . .

# Install deps (this will use bun.lock if present)
RUN bun install

# Build the static site
RUN bun run build

# Install express if you want to serve with Express (skip if using your own Bun server)
RUN bun add express

# Expose port (use 8080 for Beanstalk compatibility)
EXPOSE 8080

# Launch your server (adjust the path/script as needed)
CMD ["bun", "run", "start"]

