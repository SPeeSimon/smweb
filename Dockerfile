FROM nginx:latest 
 
COPY ./default.conf /etc/nginx/conf.d/ 
RUN chown root.root /etc/nginx/conf.d/default.conf && chmod 444 /etc/nginx/conf.d/default.conf

COPY html /usr/share/nginx/html/
RUN chown -R root.root /usr/share/nginx/html/
RUN find /usr/share/nginx/html/ -type d -not -perm 755 -exec chmod 755 {} \;
RUN find /usr/share/nginx/html/ -type f -not -perm 644 -exec chmod 644 {} \;
