import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 自动识别 base path：项目仓库模式（username/repository）需要子路径，
// 用户/组织站点（username.github.io）使用根路径。
function resolveBase(): string {
  // 优先使用环境变量 SITE_BASE（手动覆盖）
  if (process.env.SITE_BASE) return process.env.SITE_BASE;
  // GitHub Actions 环境下，从 GITHUB_REPOSITORY 推断
  if (process.env.GITHUB_REPOSITORY) {
    const [, repo] = process.env.GITHUB_REPOSITORY.split('/');
    // username.github.io 形式 → 根路径
    if (repo.endsWith('.github.io')) return '/';
    // 项目仓库 → /仓库名/
    return `/${repo}/`;
  }
  // 本地开发 → 根路径
  return '/';
}

function resolveSite(): string {
  // 优先使用环境变量 SITE_URL
  if (process.env.SITE_URL) {
    const url = process.env.SITE_URL.replace(/\/+$/, '');
    return `${url}/`;
  }
  // 从 GITHUB_REPOSITORY 推断
  if (process.env.GITHUB_REPOSITORY) {
    const [owner] = process.env.GITHUB_REPOSITORY.split('/');
    return `https://${owner}.github.io/`;
  }
  // 默认 fallback
  return 'https://zhangjintao314.github.io/';
}

const base = resolveBase();
const site = resolveSite();

export default defineConfig({
  base,
  site,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
