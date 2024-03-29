# Out-Linear

<img height="32" width="32" align="left" src='https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png' />

<img height="32" width="32" align="left" src='https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png' />

<img height="32" width="32" align="left" src='https://raw.githubusercontent.com/rahul-jha98/README_icons/main/language_and_tools/square/material-ui/material-ui.svg' />

<img height="32" width="32" align="left" src='https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png' />


"Helps straight think you." - Gonzaga University Coffee Shop

A tool for use by fiction authors to plan out their next big work.

[Deployment](https://adb-outlinear.herokuapp.com/)

## Demo

![Example](https://user-images.githubusercontent.com/42557448/133675481-c3cd7bde-2d5f-4b04-a6a9-ee5b5df56a6f.gif)

## Requirements

- A running [PostgreSQL installation](https://www.postgresql.org/download/) with a database named "outlinear", a user named 'postgres' and a password, 'postgres'
- A `config.ts` located in the `server` directory with a configuration matching the example
- Optionally, a `.env` file in the root directory that specifies a connection name, host, port, username, password, and database in the following format:
```
DB_CONNECTION_NAME=default
DB_TYPE=postgres
DB_HOST=<YOUR_HOST>
DB_PORT=5432
DB_USERNAME=<YOUR_USERNAME>
DB_PASSWORD=<YOUR_PASSWORD>
DB_NAME=<YOUR_DB_NAME>
```

## Run Instructions

1. Clone the repository
2. Run `yarn build` to install the client-dependencies and build the client-side
3. Run `yarn start` to install server-dependencies and start the server on Port 4000

## Changelog

* Future Features:
	* Multiple book management
	* Modularized Data Structures on the back-end
	* Book title editing
	* Character, Location, Concept Nodes
* Patch 1.2
	* Adds default configuration options for database connection.
* Patch 1.1
	* Adds Authentication via Firebase
* Patch 1.0
	* Features:
		* Create a book, create a chapter, edit a chapter
