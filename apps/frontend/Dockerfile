FROM node:20-alpine AS builder
WORKDIR /app

ARG VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
ENV VITE_GRAPHQL_ENDPOINT=$VITE_GRAPHQL_ENDPOINT

COPY package.json package-lock.json* ./
COPY apps/frontend/package.json apps/frontend/
RUN npm ci --workspace=apps/frontend --include-workspace-root

COPY apps/frontend apps/frontend
RUN npm run build -w apps/frontend

FROM nginx:alpine
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
