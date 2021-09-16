# OutLinear

An tool for use by fiction authors to plan their next big work.

## Requirements

- A running [PostgreSQL installation](https://www.postgresql.org/download/) with a database named "outlinear"
- A `config.ts` located in the `server` directory with a configuration matching the example

## Run Instructions

1. Start PostgreSQL
2. Create a new database with the name `outlinear` (or the name corresponding to the database field of your `config.ts` file) using the command `createdb <database-name>`
3. Run `yarn build` to install the client-dependencies and build the client-side
4. Run `yarn start` to install server-dependencies and start the server on Port 3000

## Technologies

<img height="32" width="32" align="left" src='https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png' />

<img height="32" width="32" align="left" src='https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png' />

<img height="32" width="32" align="left" src='https://raw.githubusercontent.com/rahul-jha98/README_icons/main/language_and_tools/square/material-ui/material-ui.svg' />

<img height="32" width="32" align="left" src='https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png' />

