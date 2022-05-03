import { OpenApiSpec } from '@loopback/rest';
import appConfig from './app.config';

const pkg = require('../../package.json');

const spec: OpenApiSpec = {
  openapi: '3.0.0',
  info: {
    title: pkg.name,
    version: pkg.version,
  },
  paths: {},
  security: [
    {
      bearerAuth: [],
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
      },
    },
  },
  servers: [
    {
      url: `https://omni.metrobank.ph/${appConfig.env}/opp/${appConfig.rest.basePath}/`,
    },
    { url: `http://localhost:50691/${appConfig.rest.basePath}/` },
  ],
};

export default spec;
