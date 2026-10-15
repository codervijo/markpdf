import { existsSync } from "node:fs";
import { join } from "node:path";

// True when a file under public/ exists at build time. Lets asset slots
// (og:image, demo video) stay out of the HTML until the file is supplied,
// so nothing ships pointing at a 404.
export const publicAssetExists = (p) =>
  Boolean(p) && existsSync(join(process.cwd(), "public", p.replace(/^\//, "")));
