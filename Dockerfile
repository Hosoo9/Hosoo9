FROM node:18.16-alpine3.16 as base
RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY prisma/schema.prisma .
RUN npx prisma generate

EXPOSE 3000
