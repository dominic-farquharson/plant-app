# Big Plant

This is a node & express backend that serves a react frontend.

## Setup

1. [Install Postgres](https://www.postgresql.org/download/).
1. Install dependencies. Run `yarn install` in the root of the project. The enter the client directory, `cd client` and run `yarn install` as well.
1. Create a `.env` file in the project root. `cp .env.sample .env`.
1. Seed database. This will create a database called `plant_app_development`    and run the db migrations and seed file.
    1. Run `yarn db:setup`. Refer to the scripts section of the package.json file for additional commands.
    Misc: If you encounter errors when connecting to the dabase edit the `db/config/config.json` with your connection details if your lcoal db is password protected.

## Usage

- Start app
    - development:
      1. in the root of the project run `yarn dev` to start the server using nodemon.
      2. In a new terminal window, enter the client directory, `cd client` and run `yarn && yarn start` to start the react application.
    - production:
      1. in the root of the project run `yarn start` to start the server using node.
      2. In a new terminal window, enter the client directory, `cd client` and run `yarn build` to build the react application.
      3. Navigate to the server from your browser to access the built react application.
