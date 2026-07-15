import { cp, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const exportDirectory = resolve(projectRoot, "out");
const pagesDirectory = resolve(projectRoot, "docs");

await rm(pagesDirectory, { recursive: true, force: true });
await cp(exportDirectory, pagesDirectory, { recursive: true });
await writeFile(resolve(pagesDirectory, "CNAME"), "jplaines.com\n");
await writeFile(resolve(pagesDirectory, ".nojekyll"), "");
