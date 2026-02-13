import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
const isProd = NODE_ENV === "production";
const isDev = NODE_ENV === "development";
const isTest = NODE_ENV === "test";

if (!process.env.PORT && NODE_ENV === "production") {
    throw new Error("PORT must be defined in production");
}

const port = Number(process.env.PORT) || 4001;
const dbPort = Number(process.env.DATABASE_PORT) || 5432;

const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME || "wildtiertante";
const DATABASE_URL = process.env.DATABASE_URL; // for deployment

if (!DATABASE_USER && !DATABASE_URL) {
    throw new Error(
        "DATABASE_USER or DATABASE_URL must be defined in your environment",
    );
}
if (!DATABASE_PASSWORD && !DATABASE_URL) {
    throw new Error("DATABASE_PASSWORD must be defined in your environment");
}

export {
    NODE_ENV,
    isProd,
    isDev,
    isTest,
    port,
    dbPort,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_URL,
};
