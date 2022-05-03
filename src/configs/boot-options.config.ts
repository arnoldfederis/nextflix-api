import { BootOptionConfig } from '../interfaces/config.interface';

// Customize ControllerBooter Conventions in controllers key
const bootOptions: BootOptionConfig = {
  controllers: {
    dirs: ['controllers'],
    extensions: ['.controller.js'],
    nested: true,
  },
};

export default bootOptions;
