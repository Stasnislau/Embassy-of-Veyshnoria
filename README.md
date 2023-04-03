# Embassy of Veyshnoria

Embassy of Veyshnoria is a web service that allows users to apply, store, and delete visits, applications for visas, and residence permits in a fictional country. It also provides a login system for users to create an account and securely log in and log out.

## Technologies used

The Embassy of Veyshnoria project is built using the following technologies:

- React
- TypeScript
- PostgreSQL with Prisma

## Installation

To install the Embassy of Veyshnoria project on your local machine, follow these steps:

1. Add a `.env` file to the `Server` folder with the following parameters: `DATABASE_URL`, `PORT`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `ACCESS_TOKEN_LIFE`, `REFRESH_TOKEN_LIFE`, `CLIENT_URL`, `API_URL`, `API_DOMAIN`. Also you should add to the `Client` folder another .env file with `REACT_APP_API_URL` field.
2. Run the command `npm i`.
3. Change the directory to the `Server` folder and run `npm i` there.
4. From the `Server` folder, run `npm run start-dev`.

## Demo

A demo of the Embassy of Veyshnoria project is available at [https://embassy-of-veyshnoria.netlify.app/login](https://embassy-of-veyshnoria.netlify.app/login). 
