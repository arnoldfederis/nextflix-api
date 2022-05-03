import { env } from '../helpers';
import { CorsConfig } from '../interfaces/config.interface';

const corsConfig: CorsConfig = {
  origin: env('CORS_ORIGIN', '*'),
  methods: env('CORS_METHODs', '*'),
  credentials: env('CORS_CREDENTIALS', 'false'),
  optionsSuccessStatus: +env('CORS_OPTION_SUCCESS_STATUS', 204),
  allowedHeaders: env('CORS_ALLOWED_HEADERS', '*'),
};

export default corsConfig;
