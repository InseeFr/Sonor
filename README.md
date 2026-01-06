# Sonor app

## Installation

### Requirements

- Node.js (version > 10.15)
- pnpm

### Install dependencies

`pnpm install`

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

`pnpm dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Run unit tests with jest

`pnpm test`

To see the tests coverage:
`pnpm test -- --coverage`
