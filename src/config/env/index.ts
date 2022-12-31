import * as dotenv from 'dotenv'

dotenv.config()

const NODE_ENV: string = process.env.NODE_ENV || 'development'

interface IConfig {
  port: string | number
  database: {
    MONGODB_URI_MAIN: string
    MONGODB_URI_HAIANHEZI: string
  }
}

const development = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI_MAIN: process.env.MONGODB_URI_MAIN,
    MONGODB_URI_HAIANHEZI: process.env.MONGODB_URI_HAIANHEZI
  }
}

const test = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI_MAIN: process.env.MONGODB_URI_MAIN,
    MONGODB_URI_HAIANHEZI: process.env.MONGODB_URI_HAIANHEZI
  }
}

const production = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI_MAIN:
      process.env.MONGODB_URI_MAIN || 'mongodb://production_uri/',
    MONGODB_URI_HAIANHEZI:
      process.env.MONGODB_DB_HAIANHEZI || 'mongodb://production_uri/'
  }
}

const config: {
  [name: string]: IConfig
} = {
  development,
  production,
  test
}

export default config[NODE_ENV]
