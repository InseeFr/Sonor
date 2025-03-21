### BUILD STEP ###

FROM node:latest AS builder

WORKDIR /sonor

COPY ./ ./

RUN yarn && yarn build

### EXECUTION STEP ###

FROM nginxinc/nginx-unprivileged:mainline-alpine

# Non root user
ENV NGINX_USER_ID=101
ENV NGINX_GROUP_ID=101
ENV NGINX_USER=nginx
ENV NGINX_GROUP=nginx

USER $NGINX_USER_ID

# Add build to nginx root webapp
COPY --from=builder --chown=$NGINX_USER:$NGINX_GROUP /sonor/build /usr/share/nginx/html

# Copy nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=$NGINX_USER:$NGINX_GROUP /sonor/nginx.conf /etc/nginx/conf.d/nginx.conf

# Add entrypoint and start nginx server
RUN chmod 755 /usr/share/nginx/html/vite-envs.sh
ENTRYPOINT [ "sh", "-c", "/usr/share/nginx/html/vite-envs.sh && nginx -g 'daemon off;'"]