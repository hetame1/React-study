import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import run from "@design/esbuild-config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "package.json"), "utf8"));

run({ pkg });
