import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

const apiPort = process.env.VITE_API_PORT || 4001;

const keyPath = path.resolve(__dirname, "../localhost-key.pem");
const certPath = path.resolve(__dirname, "../localhost.pem");

const hasHttpsCertificates = fs.existsSync(keyPath) && fs.existsSync(certPath);

export default defineConfig({
    plugins: [react()],
    root: path.resolve(__dirname),
    server: {
        ...(hasHttpsCertificates
            ? {
                  https: {
                      key: fs.readFileSync(keyPath),
                      cert: fs.readFileSync(certPath),
                  },
              }
            : {}),
        port: 4000,
        proxy: {
            "/api": `http://localhost:${apiPort}`,
            "/socket.io": {
                target: `http://localhost:${apiPort}`,
                ws: true,
            },
        },
    },
    build: {
        outDir: "dist",
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/setupTests.js",
    },
});
