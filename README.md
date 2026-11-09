# 南山逐北 · Astro Personal Tech Blog

一个可部署到 GitHub Pages 的个人技术博客 MVP。

## 技术栈

- Astro 5 + TypeScript
- Tailwind CSS 4（通过 Vite 插件集成）
- Astro Content Collections（Markdown）
- Astro MDX integration（支持 `.mdx`）
- GitHub Actions + GitHub Pages

## 功能

- 首页、响应式导航、文章列表、文章详情、项目展示、关于页面
- 深色玻璃拟态风格
- 背景切换：深空 / 山脉 / 夜色
- 背景遮罩透明度、模糊度、亮度调节
- 背景偏好保存在当前浏览器 `localStorage`
- Content Collections schema 校验
- MD / MDX 文章
- GitHub Pages 自动构建部署
- 自动处理项目仓库的 base path

## 环境要求

- Node.js 22 LTS（推荐）
- npm 10+
- Git

## 本地运行

```bash
npm install
npm run dev
```

打开终端显示的本地地址，通常是 http://localhost:4321 。

## 检查与构建

```bash
npm run check
npm run build
npm run preview

# build 会在 dist 中生成 Pagefind 搜索索引
```

构建产物位于 `dist/`。

## 添加文章

在 `src/content/posts/` 新建 `.md` 或 `.mdx` 文件：

```md
---
title: "文章标题"
description: "文章摘要"
pubDate: 2026-11-08
author: "Jonathan Joe"
category: "AI"
tags: ["AI", "工程实践"]
draft: false
---

# 正文

你的 Markdown 内容。
```

字段由 `src/content.config.ts` 校验。`draft: true` 的文章不会被公开构建。

## 配置 GitHub 仓库动态

编辑 `src/data/github.ts`，将 `YOUR_GITHUB_USERNAME` 替换为你的 GitHub 用户名。网站通过 GitHub 公共 API 读取公开仓库，无需 Token；未配置或 API 不可用时会显示演示项目。可在 `pinnedRepos` 中指定优先展示的仓库名。

## 搜索、目录与封面

- `npm run build` 会在 Astro 构建后运行 Pagefind，生成 `dist/pagefind/` 索引；开发模式下没有索引时搜索页会显示提示。
- 文章详情页自动读取 Markdown 标题生成目录；全站顶部显示阅读进度条。
- 代码块带有一键复制按钮。
- 每篇文章自动生成 `/covers/<slug>.svg` 封面，内容来自 frontmatter。

## GitHub Pages 部署

1. 在 GitHub 创建一个空仓库，例如 `nanshan-tech-blog`。
2. 将本项目解压到本地目录。
3. 在项目根目录执行：

```bash
git init
git add .
git commit -m "Initial Astro blog"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

4. 打开 GitHub 仓库的 **Settings → Pages**。
5. 在 **Build and deployment → Source** 中选择 **GitHub Actions**。
6. 推送到 `main` 后，Actions 会自动构建并部署。
7. 在 Pages 页面查看实际发布地址。

### Base path 说明

`astro.config.mjs` 会自动识别 GitHub Actions 环境：

- 项目仓库 `username/repository`：自动设置 `base: /repository`
- 用户/组织站点 `username/username.github.io`：使用根路径 `/`
- 本地开发：使用根路径 `/`

所有站内链接使用 `import.meta.env.BASE_URL`，避免部署到项目子路径后链接失效。

如果你使用自定义域名或需要手动指定路径，可以在构建时设置：

```bash
SITE_URL=https://your-domain.example SITE_BASE=/ npm run build
```

注意：自定义域名需要在 GitHub Pages 设置域名，并按 GitHub 指引配置 DNS 与 HTTPS。

## 重要说明

- 当前背景预设使用 Unsplash 图片地址，需要访问互联网才能加载。你可以替换成自己拥有使用权的图片，并放在 `public/backgrounds/`。
- 浏览器中的背景调节只影响当前访问者；想更改所有访客的默认背景，需要修改 `BackgroundSettings.astro` 中的默认预设或 `global.css` 初始变量并重新部署。
- 本项目不包含评论后端、账号系统或数据库；GitHub Pages 是静态托管服务。
- 项目目前没有接入搜索索引服务，后续可增加 Pagefind。

## 目录结构

```text
.
├── .github/workflows/deploy.yml
├── public/favicon.svg
├── src
│   ├── components
│   │   ├── BackgroundSettings.astro
│   │   ├── ReadingProgress.astro
│   │   ├── CodeEnhancements.astro
│   │   └── GitHubRepos.astro
│   │   ├── Footer.astro
│   │   └── Header.astro
│   ├── content
│   │   └── posts
│   ├── data
│   │   ├── projects.ts
│   │   └── site.ts
│   ├── layouts/BaseLayout.astro
│   ├── pages
│   │   ├── blog/[slug].astro
│   │   ├── blog/index.astro
│   │   ├── projects/index.astro
│   │   ├── about.astro
│   │   ├── search.astro
│   │   ├── covers/[slug].svg.ts
│   │   ├── index.astro
│   │   ├── rss.xml.ts
│   │   └── 404.astro
│   ├── styles/global.css
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 第一版验收清单

- [ ] `npm install` 成功
- [ ] `npm run check` 通过
- [ ] `npm run build` 成功生成 `dist/`
- [ ] 首页、文章列表、文章详情、项目页、关于页均可访问
- [ ] 移动端导航可展开和关闭
- [ ] 背景预设可切换
- [ ] 遮罩、模糊、亮度滑块即时生效
- [ ] 保存后刷新页面，背景偏好仍然保留
- [ ] 恢复默认可恢复初始背景参数
- [ ] GitHub Actions 成功部署
- [ ] 项目仓库子路径下站内链接、favicon 与文章详情路由正常
