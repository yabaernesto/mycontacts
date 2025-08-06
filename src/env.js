require('dotenv').config()
const { z } = require('zod')

const envSchema = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  PORT: z.coerce.number().default(3000),
})

exports.env = envSchema.parse(process.env)
