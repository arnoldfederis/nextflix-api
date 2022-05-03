import { env, explorerFile } from '../helpers';
import { ExplorerConfig } from '../interfaces/config.interface';

const explorerConfig: ExplorerConfig = {
  path: env('EXPLORER_PATH', '/explorer'),
  indexTemplatePath: explorerFile(env('EXPLORER_THEME', 'dark')),
};

export default explorerConfig;
