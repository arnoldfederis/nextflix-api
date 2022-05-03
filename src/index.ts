import { AppConfig } from './interfaces/config.interface';
import { NextflixApiApplication } from './application';
import appConfig from './configs/app.config';

export * from './application';

export async function main(options: AppConfig) {
  const app = new NextflixApiApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  main(appConfig).catch((err) => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
