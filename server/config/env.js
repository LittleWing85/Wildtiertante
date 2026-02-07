const NODE_ENV = process.env.NODE_ENV || "development";

const isProd = NODE_ENV === "production";
const isDev = NODE_ENV === "development";

const port = process.env.PORT || 4001;

export { NODE_ENV, isProd, isDev, port };
