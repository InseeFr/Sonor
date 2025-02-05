# Sonor app

## Installation

### Requirements

- Node.js (version > 10.15)
- npm or yarn

### Install dependencies

`npm install` or `yarn install`

## Configuration

### Configuration of the application

The configuration of the application can be modified in the .env file :

```
  AUTHENTICATION_MODE
  PEARL_JAM_URL
  QUEEN_URL_BACK_END
  QUEEN_URL_FRONT_END
  ISSUER_URI
  OIDC_CLIENT_ID
```

## Usage

### Start the app

`npm start` or `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Start mock servers

To test the application at this point you need to use the server _mocked_apis_server_ to serve the pearlJam APIs.
You will find it at the root of this project : /mocked_apis_server

`cd ./mocked_apis_server`

Run the following commands to install and start the server:

`npm install` (or `yarn install`)

`npm start` (or `yarn start`)

### Run unit tests with jest

`npm run test` or `yarn  run test`

To see the tests coverage:
`npm test -- --coverage` (or `yarn test -- --coverage`)

### End to end tests with cypress

`npm run cypress:open` or `yarn run cypress:open`
