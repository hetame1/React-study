import esbuild from "esbuild";
import { readFileSync } from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = JSON.parse(readFileSync("./package.json"));

const dev = process.argv.includes("--dev");
const minify = !dev;

const watch = process.argv.includes("--watch");

const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.devDependencies,
});

const baseConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify,
  sourcemap: true,
  outdir: "dist",
  format: "esm",
  target: "es2019",
  watch,
};

Promise.all([
  esbuild.build({
    ...baseConfig,
    format: "esm",
  }),
  esbuild
    .build({
      ...baseConfig,
      format: "cjs",
      outExtension: {
        ".js": ".cjs",
      },
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    }),
]);
