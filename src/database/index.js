require('dotenv').config()
const { Client } = require('pg')

const { env } = require('../env')

const client = new Client({
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
})

client.connect()

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values)
  return rows
}
