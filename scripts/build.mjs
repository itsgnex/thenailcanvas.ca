import { cp, mkdir, rm } from "node:fs/promises";

const dist = new URL("../dist/", import.meta.url);
const root = new URL("../", import.meta.url);
const files = ["index.html", "styles.css", "script.js", "public"];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of files) {
  await cp(new URL(file, root), new URL(file, dist), {
    recursive: true,
    filter: (source) => !source.endsWith(".DS_Store"),
  });
}

console.log("Static site built to dist/");
