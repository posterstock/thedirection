FROM nginxinc/nginx-unprivileged:1.21.6
COPY main /usr/share/nginx/html
COPY example-su /usr/share/nginx/example-su
COPY --chown=101:101 nginx/default.conf /etc/nginx/conf.d/default.conf
