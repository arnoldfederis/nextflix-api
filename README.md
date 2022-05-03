# nextflix-api

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Clone the project and initialize env

```sh
git clone https://github.com/arnoldfederis/nextflix-api.git
```

```sh
cd nextflix-api
```

```sh
cp .env.example .env
```

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step or

run `nodemon .` if you have nodemon in your global package.

## Run watch for local development

```sh
npm build:watch
```

```sh
npm run watch
```

```sh
node .
```

```sh
nodemon .
```

Open http://127.0.0.1:4000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file

## Tests

```sh
npm test
```
