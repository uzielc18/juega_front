FROM node as build
RUN npm install -y -g @angular/cli@8.3.20
WORKDIR /app
#COPY package*.json /app/

COPY . /app
RUN yarn install
ARG configuration=production
RUN npm run build -- --outputPath=./dist/out --configuration $configuration
# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /app/dist/out/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

 EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]



# FROM node

# RUN npm install -y -g @angular/cli@8.3.20
# WORKDIR /src
# EXPOSE 4200