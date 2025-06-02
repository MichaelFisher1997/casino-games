# Build step: install all deps & build assets
FROM node:20 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci        # <-- better than npm install for CI

COPY . .
RUN npm run build

# Runtime step: only what's needed to run
FROM node:20 AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install ONLY production dependencies
RUN npm install --omit=dev

EXPOSE 8080
CMD ["node", "server.js"]

