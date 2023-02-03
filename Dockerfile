FROM node:16.17.0-alpine

# set working directory
WORKDIR /usr/src/app

EXPOSE 3000

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY yarn.lock ./
RUN yarn install

# add app
COPY . ./

RUN yarn

# start app
CMD ["yarn", "dev"]

