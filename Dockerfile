FROM nginx

ADD ./deploy/nginx.conf /etc/nginx/nginx.conf

ADD ./deploy/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80