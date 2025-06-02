FROM node:20 AS builder
WORKDIR /app

# Install dependencies with npm
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM oven/bun:1.1.13
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080
CMD ["bun", "run", "server.ts"]

