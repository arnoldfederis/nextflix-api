import { BootMixin } from '@loopback/boot';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RestApplication } from '@loopback/rest';
import { MySequence } from './sequence';
import { RepositoryMixin } from '@loopback/repository';
import { AppConfig } from './interfaces/config.interface';
import path from 'path';
import specConfig from './configs/spec.config';
import explorerConfig from './configs/explorer.config';
import bootOptions from './configs/boot-options.config';

export class NextflixApiApplication extends BootMixin(
  RepositoryMixin(RestApplication)
) {
  constructor(options: AppConfig) {
    super(options ?? {});

    this.projectRoot = __dirname;

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to(explorerConfig);
    this.component(RestExplorerComponent);

    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = bootOptions;

    this.api(specConfig);
  }
}
