FROM node:18-alpine as server

WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
ENV DATABASE_URL=postgresql://andreidergavko:andreidergavko@localhost:5432/money-tracker-db?schema=public
ENV JWT_SECRET=clmhg09170000n4twvuvoi8wx
ENV GOOGLE_CLIENT_ID=840023652398-pn00h2ros0g1n9klet93g97244t0apjo.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/redirect


COPY . .
RUN npx prisma db push
RUN npx prisma generate

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
