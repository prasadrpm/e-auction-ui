#stage 1
FROM node:14.15 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/e-auction-ui /usr/share/nginx/html
