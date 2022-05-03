import { env } from '../helpers';
import { MongoConfig } from '../interfaces/config.interface';

const mongoConfig: MongoConfig = {
  name: 'mongodb',
  connector: 'mongodb',
  url: env('MONGO_URL', 'mongodb://localhost:27017/loopback'),
  host: env('MONGO_HOST', 'localhost'),
  port: env('MONGO_PORT', 27017),
  user: env('MONGO_USER', ''),
  password: env('MONGO_PASSWORD', ''),
  database: env('MONGO_DBNAME', 'loopback'),
  useNewUrlParser: true,
};

export default mongoConfig;
