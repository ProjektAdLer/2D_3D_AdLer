FROM nginx:stable
COPY .nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html

COPY create-env-config.sh /docker-entrypoint.d/
# RUN chmod +x /docker-entrypoint.d/create-env-config.sh