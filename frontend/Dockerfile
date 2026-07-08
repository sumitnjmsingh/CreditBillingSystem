FROM node:22-slim AS builder

ENV NODE_ENV=development
ENV UV_THREADPOOL_SIZE=1

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN NODE_ENV=production npm run build


FROM node:22-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]