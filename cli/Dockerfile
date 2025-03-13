FROM node:20

WORKDIR /cli

COPY . .

RUN npm install

CMD ["node", "index.js"]

# Commands to build and run:
# docker build -t cli .
# docker run -it --name cli cli