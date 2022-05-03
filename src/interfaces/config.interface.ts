import { OpenApiSpec } from '@loopback/rest'

export interface AppConfig {
  env?: string,

  rest: {
    host: string,
    port: number,
    basePath?: string,
    openApiSpec?: {
      setServersFromRequest?: boolean
    }
    expressSettings?: {
      'x-powered-by'?: boolean
    }
  }
}

export interface BootOptionConfig {
  controllers: {
    dirs: string[],
    extensions: string[],
    nested: boolean
  }
}

export interface CorsConfig {
  origin: string | string[],
  methods: string | string[],
  credentials: string,
  optionsSuccessStatus: number,
  allowedHeaders: string | string[]
}

export interface ExplorerConfig {
  path: string,
  indexTemplatePath: string
}

export interface MongoConfig {
  name?: string,
  connector?: string,
  url?: string,
  host?: string,
  port?: number,
  user?: string,
  password?: string,
  database?: string,
  useNewUrlParser?: boolean
}

export interface Config extends AppConfig, BootOptionConfig, CorsConfig, ExplorerConfig, MongoConfig, OpenApiSpec {}
