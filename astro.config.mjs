import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const owner = process.env.GITHUB_REPOSITORY?.split("/")[0];
const isUserOrOrgSite = repo && owner && repo.toLowerCase() === `${owner}.github.io`.toLowerCase();
const base = process.env.SITE_BASE ?? (
  process.env.GITHUB_ACTIONS && repo && !isUserOrOrgSite ? `/${repo}` : "/"
);

export default defineConfig({
  site: process.env.SITE_URL ?? "https://example.github.io",
  base,
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
});
