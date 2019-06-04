FROM nginx:latest 
ARG VERSION=v2.0
 
COPY ./default.conf /etc/nginx/conf.d/ 
COPY html /usr/share/nginx/html/$VERSION
RUN chown root.root /etc/nginx/conf.d/default.conf && chmod 444 /etc/nginx/conf.d/default.conf && \
    chown -R root.root /usr/share/nginx/html/$VERSION && \
    find /usr/share/nginx/html/$VERSION -type d -not -perm 755 -exec chmod 755 {} \; && \
    find /usr/share/nginx/html/$VERSION -type f -not -perm 644 -exec chmod 644 {} \;
