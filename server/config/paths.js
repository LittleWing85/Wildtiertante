import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../");
const clientPublicPath = path.join(projectRoot, "client", "public");
const clientIndexPath = path.join(projectRoot, "client", "index.html");

export { clientPublicPath, clientIndexPath };
