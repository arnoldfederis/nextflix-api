import { env } from '../helpers';
import { AppConfig } from '../interfaces/config.interface';

const appConfig: AppConfig = {
  env: env('APP_ENV', 'dev'),

  rest: {
    host: env('APP_HOST', 'http://localhost'),
    port: +env('APP_PORT', 4000),
    basePath: env('APP_PATH', 'api'),
    openApiSpec: {
      // useful when used with OpenAPI-to-GraphQL to locate your application
      setServersFromRequest: true,
    },
    expressSettings: {
      'x-powered-by': false,
    },
  },
};

export default appConfig;
