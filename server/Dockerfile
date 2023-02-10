FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile

COPY prisma/schema.prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/server.js"]