const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),

    MYSQL_HOST: Joi.string().required().description('Central Mysql Host'),
    MYSQL_USER: Joi.string().required().description('Central Mysql User'),
    MYSQL_PASSWORD: Joi.string().required().description('Central Mysql Password'),
    MYSQL_DB: Joi.string().required().description('Central Mysql DB'),
    MYSQL_PORT: Joi.string().required().description('Central Port'),

    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    UPLOAD_MEDIA_PATH: Joi.string().description('base media path to upload files'),
        CRON_SERVER: Joi.bool().default(false),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  linesheetProductGroupsLimit: 100,
  frontend: {
      host: envVars.RO_FRONTEND_HOST,
  },
  databases: {
      central: {
          db: envVars.MYSQL_DB,
          port: envVars.MYSQL_PORT,
          host: envVars.MYSQL_HOST,
          user: envVars.MYSQL_USER,
          passwd: envVars.MYSQL_PASSWORD
      },
      logDB: {
          url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
          options: {
              useCreateIndex: true,
              useNewUrlParser: true,
              useUnifiedTopology: true,
          },
      }
  },
  jwt: {
      secret: envVars.JWT_SECRET,
      accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
      refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
      resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
      verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
      longtermExpirationYears: envVars.JWT_LONGTERM_EXPIRATION_YEARS
  },
  sso: {
      crossDomainURL: envVars.SSO_CROSSDOMAIN_URL
  },
  email: {
      smtp: {
          host: envVars.SMTP_HOST,
          port: envVars.SMTP_PORT,
          auth: {
              user: envVars.SMTP_USERNAME,
              pass: envVars.SMTP_PASSWORD,
          },
      },
      from: envVars.EMAIL_FROM,
      qaEmail: envVars.QA_EMAIL
  },
  accessDomains: envVars.ACCESSDOMAINS || '',
  redis: {
      url: envVars.REDIS_URL,
      host: envVars.REDIS_HOST,
      port: envVars.REDIS_PORT,
      db: envVars.REDIS_DB,
      password: envVars.REDIS_PASSWORD,
      expiryTime: envVars.REDIS_EXPIRY_TIME
  },
  media_host: envVars.MEDIA_DOMAIN,
  uploadMediaPath: envVars.UPLOAD_MEDIA_PATH,
  reportMediaPath: envVars.REPORT_MEDIA_PATH,
  cron_server: envVars.CRON_SERVER,

  byKeyName: (key)=>{
      return envVars[key] ?? null
  }

}
