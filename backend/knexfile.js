import dotenv from 'dotenv';
dotenv.config();

export default {
    client: 'pg',
    connection: {
        connectionString: process.env.DB_URL,
        ssl: {
            rejectUnauthorized: false
        }
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }
};
