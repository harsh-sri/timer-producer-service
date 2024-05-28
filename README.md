
## Description

Timer Producer Service to create and fetch timers

## Prerequisite
- Nodejs version: `v18.13.0`
- NestJs: `v10`
- Typescript
- Docker


###### You need specific version of nodejs only when you run the app without Docker. In that case please follow the steps mentioned below
- Start kafka in container mode by running the following command in your terminal
    - `docker run -p 9092:9092 apache/kafka:3.7.0` 
    - Once Kafka is up and running then follow the steps mentioned below
    - Note: [To run kafka without container, please follow the steps mentioned here](https://kafka.apache.org/quickstart)
-  Start Mongodb in container mode by running the following command in your terminal
    - `docker run -p 27017:27017 mongo:6.0.13-jammy`
    - Once Mongodb is up and running then follow the steps mentioned below
    - Note: [To run mongodb without container, please follow the steps mentioned here](https://www.mongodb.com/docs/manual/installation/)
    - [Or you may create a free cluster here](https://www.mongodb.com/products/tools/compass)
- Once above-mentioned steps the are done, please run the following command to install the dependencies & start the app

## Tech Stack
- Node.js
- Typescript
- Nestjs
- MongoDB
- TypeOrm
- Kafka
- Docker
- Redis

## Architecture Diagram
TBD

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app with Docker

```bash
$ docker-compose up --build
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## API Doc

