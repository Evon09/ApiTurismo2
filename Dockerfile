FROM node:18

WORKDIR /app

COPY . .

ENV PATH /app/node_modeules/.bin:$PATH
RUN npm install

EXPOSE 3000
CMD npm start

