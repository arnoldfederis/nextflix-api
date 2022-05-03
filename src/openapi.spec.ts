// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-validation-app
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { AppConfig } from './interfaces/config.interface';
import { NextflixApiApplication } from './application';
import appConfig from './configs/app.config';

/**
 * Export the OpenAPI spec from the application
 */
async function exportOpenApiSpec(): Promise<void> {
  const config: AppConfig = {
    rest: {
      port: appConfig.rest.port,
      host: appConfig.rest.host,
    },
  };

  const outFile = process.argv[2] ?? '';
  const app = new NextflixApiApplication(config);
  await app.boot();
  await app.exportOpenApiSpec(outFile);
}

exportOpenApiSpec().catch((err) => {
  console.error('Fail to export OpenAPI spec from the application.', err);
  process.exit(1);
});
