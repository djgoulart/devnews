import { Client } from 'faunadb'

export const fauna = new Client({
  secret: String(process.env.FAUNA_DB_KEY),
  domain: "db.us.fauna.com"
})