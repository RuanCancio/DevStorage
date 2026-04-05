# Dockerfile
FROM node:24

WORKDIR /app

# Instalar o cliente do Postgres
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm i

COPY . .

RUN npx prisma generate

EXPOSE 3000

COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

CMD ["/wait-for-postgres.sh", "postgres", "sh", "-c", "npx prisma migrate deploy && npm run dev"]