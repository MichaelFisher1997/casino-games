FROM node:20 as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build frontend
RUN npm run build

# Build server.js from server.ts
RUN npx tsc server.ts --outDir dist-server

FROM node:20

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-server/server.js ./server.js
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

EXPOSE 8080

CMD ["node", "server.js"]

