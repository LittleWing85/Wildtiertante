import { Pool } from "pg";
import fs from "fs";
import path from "path";

let dbConfig;

if (!process.env.DATABASE_URL) {
    const secretsPath = path.resolve("./server/secrets.json");
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
    // for deployment (Heroku...)
    dbConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    };
}

const pool = new Pool(dbConfig);

export default pool;
