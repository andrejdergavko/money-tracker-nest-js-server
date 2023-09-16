FROM node:18-alpine

WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

COPY . .
RUN npx prisma db push
RUN npx prisma generate

ENV DATABASE_URL=postgresql://
ENV JWT_SECRET=secret
ENV GOOGLE_CLIENT_ID=id
ENV GOOGLE_CLIENT_SECRET=secret
ENV GOOGLE_CALLBACK_URL=url


RUN yarn build

CMD yarn run start:prod



# FROM node:18-alpine as build

# WORKDIR /app
# COPY package*.json .
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json .
# RUN npm install --only=production
# COPY --from=build /app/dist ./dist
# CMD npm run start:prod
