// Configuration of data base

import { Pool } from "pg";
import {
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_URL,
    dbPort,
} from "./env.js";

let dbConfig;

// FOR DEPLOYMENT
if (DATABASE_URL) {
    dbConfig = {
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Careful! Depending on Provider + Security issues
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    };
}

// FOR LOCAL DEVELOPMENT
else {
    dbConfig = {
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        host: "localhost",
        port: dbPort,
        database: DATABASE_NAME,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    };
}

const pool = new Pool(dbConfig);

export default pool;
