# Build environment
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json yarn.lock .env ./
COPY public ./public
RUN yarn install --frozen-lockfile --network-timeout 600000
COPY jsconfig.json .prettierrc ./
COPY scripts ./scripts
COPY src ./src
RUN yarn build
COPY nginx.conf ./

# Production Env
FROM nginx:stable-alpine
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf    
WORKDIR /usr/share/nginx/html


# Add bash
RUN apk add --no-cache bash

## Copy .env file and shell script to container
COPY --from=build /app/build ./
COPY --from=build /app/scripts/env.sh .
COPY --from=build /app/scripts/.env .


## Make shell script executable and prevent windows encoding
RUN sed -i -e 's/\r$//' env.sh && sed -i -e 's/\r$//' .env && chmod +x env.sh

# add non-root user
RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# non root users cannot listen on 80
EXPOSE 8080

USER nginx

# Start Nginx server
ENTRYPOINT bash -c "/usr/share/nginx/html/env.sh && nginx -g 'daemon off;'"