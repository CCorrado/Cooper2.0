SSW 695 Mr. Cooper 2.0
------------------------------
[![Build Status](https://travis-ci.org/CCorrado/Cooper2.0.svg?branch=master)](https://travis-ci.org/CCorrado/Cooper2.0)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9b29c475e12048e887a5f62a973e04ab)](https://www.codacy.com/manual/CCorrado/Cooper2.0?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=CCorrado/Cooper2.0&amp;utm_campaign=Badge_Grade)
Current version: 1.0.0

This is the top level readme for the platform. See the [wiki] for more information on how to contribute.

## Accessing Mr. Cooper
Currently, this application is hosted on AWS.

- Login: https://cooper.ccorrads.com/login

## Developing for the platform
### Getting Started
This project uses [Docker](https://www.docker.com/) and Docker Compose as a way to easily get started. If you are unable to run Docker, you may follow the build instructions within each package to set up everything manually (frontend, backend, database)

#### .env file configuration
- Note: You need to first configure the .env files in the `frontend` folder and the `backend` folder
- You may use the following configurations or check the `.env.example` files for the latest configs.

backend/.env file
```
API_VERSION=1.0.0
ENV=DEV
PORT=9000

# This follows the name of the container (or path, if building locally) to the `database` spring/boot service.
DB_BASE_URL=http://cooper-database-api:8080
```

frontend/.env file
```
# This follows the URL of the hosted backend Node API (`backend` service)
REACT_APP_API_BASE_URL="http://localhost:9000/api"
```

database/.env file
```
# This follows the name of the container (or path, if building locally) to the MySQL database instance.
DATABASE_HOST=cooper-mysql
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_NAME=cooper
DATABASE_PORT=3306
```

Once all three .env files are configured in their respective directories, you're ready to bring up the containers.
- Tip: Make sure you can run `npm install` in the `frontend` and `backend` folders as a sanity check.

### Running Docker 
In the root of the project, after the .env files have been configured, run `docker-compose up --build -d` in a terminal window to start the build and run process on your local machine.
- Note: Running `docker-compose down` will bring the containers down and delete them
- Tip: If you are having issues with docker, prune your dev environment with the following commands:
    - `docker system prune` -- Will delete any dangling containers
    - `docker volume prune` -- Will delete any unused volumes
    - `docker image prune -a` -- Will delete all images downloaded locally

## Code Changes
All code changes are verified by Travis CI which is required for updating the platform. See the individual package configurations for the different requirements.

[wiki]: https://github.com/CCorrado/Cooper2.0/wiki
