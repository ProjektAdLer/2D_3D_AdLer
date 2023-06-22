FROM nginx:stable-alpine
COPY .nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html

COPY create-env-config.sh /docker-entrypoint.d/
