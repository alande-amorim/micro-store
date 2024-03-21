FROM node:20-alpine3.17 AS base

FROM base AS development 
ARG APP 
ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV} 
WORKDIR /usr/src/app 
COPY package.json ./ 
COPY package-lock.json ./ 
RUN npm install
COPY . . 
COPY ./apps/${APP}/prisma ./prisma
RUN npx prisma generate
RUN npm run build ${APP} 

FROM base AS production 
ARG APP 
# ARG NODE_ENV=production 
# ENV NODE_ENV=${NODE_ENV} 
WORKDIR /usr/src/app 
COPY package.json ./ 
COPY package-lock.json ./ 
COPY ./apps/${APP}/prisma ./prisma
RUN npm install
COPY --from=development /usr/src/app/dist ./dist 


# Add an env to save ARG
ENV APP_MAIN_FILE=dist/apps/${APP}/main 
CMD node ${APP_MAIN_FILE}