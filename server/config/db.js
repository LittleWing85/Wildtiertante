import { Pool } from "pg";
import fs from "fs";
import path from "path";

let dbConfig;

if (!process.env.DATABASE_URL) {
    const secretsPath = path.resolve(process.cwd(), "server/secrets.json");
    const secretsRaw = fs.readFileSync(secretsPath);
    const secrets = JSON.parse(secretsRaw);

    const { DATABASE_USER, DATABASE_PASSWORD } = secrets;
    const DATABASE_NAME = "wildtiertante";
    dbConfig = {
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        host: "localhost",
        port: 5432,
        database: DATABASE_NAME,
    };
} else {
    dbConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // change for deployment
    };
}

const pool = new Pool({
    ...dbConfig,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export default pool;
