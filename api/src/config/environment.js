const dotenv = require("dotenv");
const joi = require("joi");
dotenv.config();

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
    JWT_EXPIRATION: joi.number().default(21600000),
    MONGODB_HOST: joi.string().default(process.env.MONGODB_HOST)
  })
  .unknown()
  .required();

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
  mongodb: {
    host: envVars.MONGODB_HOST
  }
};
