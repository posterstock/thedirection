FROM docker.io/nginxinc/nginx-unprivileged:stable
COPY main /usr/share/nginx/html
COPY --chown=101:101 nginx/default.conf /etc/nginx/conf.d/default.conf
