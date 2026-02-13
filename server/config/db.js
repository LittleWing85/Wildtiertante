import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let dbConfig;

// FOR DEPLOYMENT
if (process.env.DATABASE_URL) {
    dbConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Careful! Depending on Provider + Security issues
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    };
}

// FOR LOCAL DEVELOPMENT
else {
    const {
        DATABASE_USER,
        DATABASE_PASSWORD,
        DATABASE_NAME = "wildtiertante",
    } = process.env;

    if (!DATABASE_USER || !DATABASE_PASSWORD) {
        throw new Error(
            "Missing database environment variables. Please set DATABASE_USER and DATABASE_PASSWORD in the .env file.",
        );
    }

    dbConfig = {
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        host: "localhost",
        port: 5432,
        database: DATABASE_NAME,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    };
}

const pool = new Pool(dbConfig);

export default pool;
