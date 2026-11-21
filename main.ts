// Vice Coast Cover Studio — entry program (Node 22, standard library only).
// Copies app/ and screenshots/ from this repository into the output
// directory and writes /output/dossier.json with buildDossier from the
// kit's vendor/makefun-app.ts. Outside the grader, MAKEFUN_OUTPUT_DIR
// stands in for /output. The output directory itself is never removed:
// the grader bind-mounts it, so only its contents are emptied.
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-app.ts";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");

function emptyOutputDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function copyTree(name: string): void {
  cpSync(join(repoRoot, name), join(outputDir, name), { recursive: true });
}

emptyOutputDir(outputDir);
copyTree("app");
copyTree("screenshots");
writeFileSync(
  join(outputDir, "dossier.json"),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 50331648,
    app_path_max_bytes: 1000,
  }),
);
console.log(`vice-coast: wrote ${outputDir}`);
