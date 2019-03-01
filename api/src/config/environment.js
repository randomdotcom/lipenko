const dotenv = require("dotenv");
const joi = require("joi");

const schema = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid("development", "test", "production")
      .default("development"),
    APP_PORT: joi.number().default(3000),
    JWT_ENCRYPTION: joi
      .string()
      .default("e5a3388c-9731-4043-8b11-be602d8c8919"),
    JWT_EXPIRATION: joi.number().default(10000),
    REDIS_HOST: joi.string().default("127.0.0.1"),
    REDIS_PORT: joi.number().default(6379),
    REDIS_EXPIRE: joi
      .number()
      .positive()
      .default(900) // 15 minutes
  })
  .unknown()
  .required();

dotenv.config();

const { error, value: envVars } = joi.validate(process.env, schema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  app: {
    environment: envVars.NODE_ENV,
    port: envVars.APP_PORT
  },
  jwt: {
    secret: envVars.JWT_ENCRYPTION,
    expiration: envVars.JWT_EXPIRATION
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    expiration: envVars.REDIS_EXPIRE
  }
};