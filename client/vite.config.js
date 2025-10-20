import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    root: path.resolve(__dirname), // Root des Frontends
    server: {
        port: 4000,
        proxy: {
            "/api": "http://localhost:4001",
            "/socket.io": {
                target: "http://localhost:4001",
                ws: true,
            },
        },
    },
    build: {
        outDir: "dist", // optional, sonst standardmäßig /dist
    },
});
