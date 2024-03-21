FROM node:20-alpine3.17 AS base

FROM base AS development 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV} 
WORKDIR /usr/src/app 
COPY package.json ./ 
COPY package-lock.json ./ 
RUN npm install
COPY . . 
RUN npm run build shopify

FROM base AS production 
WORKDIR /usr/src/app 
COPY package.json ./ 
COPY package-lock.json ./ 
RUN npm install
COPY --from=development /usr/src/app/dist ./dist 


# Add an env to save ARG
ENV APP_MAIN_FILE=dist/apps/shopify/main 
CMD node ${APP_MAIN_FILE}