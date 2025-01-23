FROM nginx:stable-alpine
COPY .nginx.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html

COPY create-env-config.sh /docker-entrypoint.d/

HEALTHCHECK --interval=30s --timeout=30s --start-period=30s --retries=3 CMD curl -f http://localhost || exit 1
