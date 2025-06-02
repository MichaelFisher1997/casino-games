# Build step
FROM oven/bun:1.1.13 AS builder
WORKDIR /app

# Copy and install dependencies
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile

# Copy all source files
COPY . .

# Build the frontend
RUN bun run build

# Production image
FROM oven/bun:1.1.13
WORKDIR /app

# Copy node_modules and built assets from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock

EXPOSE 8080

# Run your server (Bun supports running TypeScript directly)
CMD ["bun", "run", "server.ts"]

