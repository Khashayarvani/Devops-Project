FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY . .

RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]