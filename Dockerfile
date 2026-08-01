# Lightweight nginx image to serve our static fish-market website
FROM nginx:alpine

# Remove default nginx sample page
RUN rm -rf /usr/share/nginx/html/*

# Copy our website files into nginx's web root
COPY . /usr/share/nginx/html/

# Nginx listens on 80 by default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
