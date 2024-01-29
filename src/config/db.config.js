import dotenv from 'dotenv'
dotenv.config()
const dbConfig = {
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USERNAME,
    dbPass: process.env.DB_PASS,
    dbPort: process.env.DB_PORT,
    dbDialect: process.env.DB_DIALECT,
    dbName: process.env.DB_NAME
}

export default dbConfig