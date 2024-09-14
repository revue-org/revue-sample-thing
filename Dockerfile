# syntax = docker/dockerfile:1.10

FROM node:20-alpine as build
LABEL maintainer="matteinimattia@gmail.com, kelvin.olaiya15@gmail.com, albi1600@gmail.com"

# Move to the directory where the application will be built
WORKDIR /home/revue-sample-thing

# Add source code
COPY . .

RUN apk add --update npm

RUN npm install --save-prod
RUN npm run build


FROM node:20-alpine as production
LABEL maintainer="matteinimattia@gmail.com, albi1600@gmail.com"

WORKDIR /home/revue-sample-thing

COPY --from=build /home/revue-sample-thing/node_modules ./node_modules
COPY --from=build /home/revue-sample-thing/dist ./dist
COPY --from=build /home/revue-sample-thing/.env ./.env
COPY --from=build /home/revue-sample-thing/package.json ./package.json
COPY --from=build /home/revue-sample-thing/package-lock.json ./package-lock.json


RUN apk add dumb-init && apk add --update npm


EXPOSE $THING_PORT

# Run dumb-init as first process, which will have PID 1, then run node command to start the application
CMD ["dumb-init", "npm", "run", "serve" ]
#CMD ["ls", "-la" ]
