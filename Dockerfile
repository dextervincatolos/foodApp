FROM node as node
ENV NODE_OPTIONS = "--openssl-legacy-provider"
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM nginx:alpine
COPY --from=node /app/dist/my-app /usr/share/nginx/html