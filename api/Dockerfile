FROM node:20

WORKDIR /api

ENV PORT=3000

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "api.js"]