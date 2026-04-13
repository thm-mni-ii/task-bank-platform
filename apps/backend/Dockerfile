FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/backend/package.json apps/backend/
RUN npm ci --workspace=apps/backend --include-workspace-root

COPY apps/backend apps/backend
RUN npm run build -w apps/backend

FROM node:20-alpine
WORKDIR /app

COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/

ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "apps/backend/dist/server.js"]
