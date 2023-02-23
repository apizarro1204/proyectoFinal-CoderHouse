// Conexión Knex
import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.PORT || 8081,
    mongoLocal: {
        client: 'mongodb',
        cxnStr: 'mongodb://localhost27017/'
    },
    mongoRemote: {
        cliente: 'mongodb',
        cxnStr: process.env.DB_MONGO,
    },
    mysql: {
        client: "mysql",
        connection: {
            host: "localhost",
            user: "root",
            password: "",
            database: "coderhouse",
        },
        pool: { min: 0, max: 10 }
    }
}