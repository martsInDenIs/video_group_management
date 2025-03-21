FROM node:20-alpine

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

ENTRYPOINT ["/bin/sh", "-c"]
CMD ["npm run migration:run && npm start"]

