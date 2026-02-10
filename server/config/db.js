import fs from "fs";
import path from "path";
import spicedPg from "spiced-pg";

let db;

if (!process.env.DATABASE_URL) {
    const secretsPath = path.resolve("./server/secrets.json");
    const secretsRaw = fs.readFileSync(secretsPath);
    const secrets = JSON.parse(secretsRaw);

    const { DATABASE_USER, DATABASE_PASSWORD } = secrets;
    const DATABASE_NAME = "wildtiertante";
    db = spicedPg(
        `postgres:${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:5432/${DATABASE_NAME}`,
    );
} else {
    db = spicedPg(process.env.DATABASE_URL);
}

export default db;
