# Embassy of Veyshnoria

Embassy of Veyshnoria is a web service that allows users to apply, store, and delete visits, applications for visas, and residence permits in a fictional country. It also provides a login system for users to create an account and securely log in and log out.

## Technologies used

The Embassy of Veyshnoria project is built using the following technologies:

- React
- TypeScript
- PostgreSQL with Prisma

## Installation

To install the Embassy of Veyshnoria project on your local machine, follow these steps:

1. Add a `.env` file to the `Server` folder with the following parameters: `DATABASE_URL`, `PORT`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `ACCESS_TOKEN_LIFE`, `REFRESH_TOKEN_LIFE`, `CLIENT_URL`, `API_URL`, `API_DOMAIN`. Also, you should add to the `Client` folder another .env file with the `REACT_APP_API_URL` field.
2. Install all dependencies
```bash
cd Client
npm install
cd ../Server
npm install
```
4.  Run from the `Server` directory
```bash
 npm run start-dev
```
## Demo

A demo of the Embassy of Veyshnoria project is available at [https://embassy-of-veyshnoria.netlify.app/login](https://embassy-of-veyshnoria.netlify.app/login). 

![image](https://github.com/Stasnislau/Embassy-of-Veyshnoria/assets/56834401/dfe6bd6d-d359-4b60-b5b4-076bf3f502d9)
![image](https://github.com/Stasnislau/Embassy-of-Veyshnoria/assets/56834401/dd833cfc-f39e-41d2-b8a1-c7927e44a26d)



Demo credentials: test.testovich@gmail.com 12345678
