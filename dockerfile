FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY ./client .
RUN npm install
RUN npm run build

FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY ./server .

RUN npm install
RUN npx prisma generate

COPY --from=frontend-builder /app/dist ./public

EXPOSE 3000

CMD ["node", "server.js"]